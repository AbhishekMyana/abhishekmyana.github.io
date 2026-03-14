const post1Content = () => (
  <>
    <p>
      The LTE MAC (Medium Access Control) layer sits between the RLC layer above and the physical layer below,
      acting as the brain that decides which UE (User Equipment) gets to transmit when, how much power to use,
      and how to honour quality commitments made at the network level. After working on this layer at Samsung
      for over two years, I want to demystify the key concepts that took me months to fully internalise.
    </p>

    <h2>What Does the MAC Layer Actually Do?</h2>
    <p>
      At its core, the MAC layer has three primary responsibilities: <strong>scheduling</strong>,
      <strong> HARQ (Hybrid ARQ)</strong>, and <strong>multiplexing/de-multiplexing</strong> of logical
      channels. But it is the scheduler that consumes the most design effort and where QoS policy truly
      comes alive.
    </p>
    <p>
      The eNB (base station) MAC scheduler runs every 1 ms — once per subframe. In that millisecond,
      it must decide the resource block (RB) allocation for every connected UE. With a 20 MHz LTE
      carrier giving you 100 resource blocks, and dozens of active UEs, the combinatorial space is vast.
      Real schedulers use heuristics rather than exhaustive search.
    </p>

    <h2>Scheduler Types</h2>
    <h3>Round Robin</h3>
    <p>
      The simplest scheduler. Each UE gets a turn in a circular order regardless of channel quality or
      buffer status. Fair in terms of opportunity, but wasteful — it will allocate RBs to a UE with
      a terrible channel when another UE has an excellent channel and a full buffer.
    </p>

    <h3>Proportional Fair (PF)</h3>
    <p>
      The workhorse of real deployments. Each UE is assigned a priority metric:
    </p>
    <pre><code>priority(i) = instantaneous_rate(i) / average_throughput(i)</code></pre>
    <p>
      UEs with a good instantaneous channel AND a poor recent average throughput rise to the top. This
      balances spectral efficiency with fairness elegantly. The average throughput window is typically
      a time-constant of 100–1000 ms.
    </p>

    <h3>Strict Priority / QoS-Aware</h3>
    <p>
      For real deployments with voice, video and data traffic co-existing, you need QCI (QoS Class
      Identifier) awareness. LTE defines 9 standardized QCI values, each with a priority level,
      packet delay budget, and packet error loss rate (PELR). For example:
    </p>
    <ul>
      <li><strong>QCI 1</strong>: Conversational voice — priority 2, 100 ms delay budget, PELR 10⁻²</li>
      <li><strong>QCI 4</strong>: Non-conversational video — priority 5, 300 ms delay budget</li>
      <li><strong>QCI 9</strong>: Default best-effort data — priority 9, 300 ms delay budget</li>
    </ul>
    <p>
      A QoS-aware scheduler layers QCI priority on top of the PF metric. QCI 1 bearers are served
      first until their GBR (Guaranteed Bit Rate) is met, then remaining resources are distributed
      PF-style among the rest.
    </p>

    <h2>Power Allocation</h2>
    <p>
      LTE uses OFDMA on the downlink and SC-FDMA on the uplink. Power must be distributed across
      allocated resource blocks. The eNB controls downlink power per RE (Resource Element), while
      uplink power control is performed by the UE under guidance from the eNB via TPC (Transmit
      Power Control) commands.
    </p>
    <p>
      Fractional Power Control (FPC) on the uplink follows:
    </p>
    <pre><code>P_PUSCH = min(P_MAX, 10*log10(M) + P0 + α*PL + ΔTF + f(i))</code></pre>
    <p>
      where <code>M</code> is the number of allocated RBs, <code>PL</code> is the path loss estimate,
      <code>α</code> is the fractional factor (0 to 1), and <code>f(i)</code> is the closed-loop
      correction from TPC commands. Setting α below 1 allows cell-edge UEs to transmit at lower power,
      reducing inter-cell interference at the cost of some throughput.
    </p>

    <h2>Network Sharing (MOCN)</h2>
    <p>
      Multi-Operator Core Network (MOCN) allows two operators to share the same RAN infrastructure
      while maintaining separate core networks. The MAC layer must be aware of per-operator load and
      apply operator-specific scheduling policies. In the features I worked on, this meant tagging
      bearers with operator IDs and enforcing capacity limits per operator in the scheduler to prevent
      one operator from starving the other.
    </p>

    <h2>Debugging MAC Issues in the Field</h2>
    <p>
      Most field issues I encountered fell into a few categories:
    </p>
    <ul>
      <li><strong>KPI degradation</strong>: Investigate RB utilisation logs, look for excessive HARQ retransmissions pointing to interference or coverage issues.</li>
      <li><strong>UE attach failures</strong>: Often a RAR (Random Access Response) timing issue — check <code>RA-RNTI</code> allocation and window parameters.</li>
      <li><strong>Sumb crashes</strong>: Typically a NULL pointer in the buffer status report handler when a bearer is released mid-scheduling cycle. Always guard with proper locking.</li>
    </ul>
    <p>
      The most valuable tool is the per-subframe scheduling log. If you can capture even 1000 consecutive
      subframes around an issue, you can reconstruct exactly which UEs were scheduled, their MCS (Modulation
      and Coding Scheme), HARQ process state, and BSR (Buffer Status Report) values — a complete picture
      of what the scheduler decided and why.
    </p>

    <h2>Key Takeaways</h2>
    <p>
      The MAC scheduler is where theory meets the constraints of real hardware and real traffic. Understanding
      QCI, GBR guarantees, and the PF fairness metric gives you the vocabulary to reason about why a
      network behaves the way it does under load. If you are moving into 5G NR, the NR MAC layer extends
      these concepts with numerology-dependent slot structures and much more flexible mini-slot scheduling
      — but the PF + QoS priority framework carries over almost directly.
    </p>
  </>
)

const post2Content = () => (
  <>
    <p>
      Passwords are fundamentally knowledge-based: if someone learns your password, they can authenticate
      as you indefinitely. Keystroke dynamics offer something different — they authenticate the <em>behaviour</em>
      of typing, not just the knowledge of a secret. I spent seven months on this problem as my final-year
      project, and it became one of the most intellectually rewarding things I have built.
    </p>

    <h2>The Core Idea</h2>
    <p>
      Every person types differently. The dwell time on each key (how long a key is held down) and the
      flight time between consecutive keys (the gap between key release and the next key press) form a
      behavioural fingerprint. These are measured in milliseconds with standard keyboard APIs and can
      be captured entirely client-side without any special hardware.
    </p>
    <p>
      The hypothesis is: even if an attacker knows your password, they are unlikely to reproduce your
      exact timing signature. The question is whether the statistical signal is strong enough to be
      useful in practice.
    </p>

    <h2>The CMU Benchmark Dataset</h2>
    <p>
      The standard starting point for any keystroke dynamics research is the CMU dataset, collected by
      Kevin Killourhy and Roy Maxion. It contains keystroke timing data from 51 subjects, each typing
      the password <code>.tie5Roanl</code> 400 times across 8 sessions. This gives a clean benchmark for
      comparing algorithms apples-to-apples.
    </p>
    <p>
      Each sample is a 31-dimensional vector: hold times for each of the 10 characters, key-down to
      key-down times for each consecutive pair, and key-up to key-down times (flight times). The
      dimensionality is small enough that even classical ML models work well.
    </p>

    <h3>Models I Trained on CMU Data</h3>
    <ul>
      <li><strong>Mahalanobis Distance classifier</strong>: Computes the distance from a new sample to the user's mean timing vector, normalised by their covariance. Simple and surprisingly effective.</li>
      <li><strong>SVM (RBF kernel)</strong>: One-class SVM trained on legitimate samples. Learned a tight boundary in feature space.</li>
      <li><strong>Random Forest</strong>: Binary classifier (genuine vs impostor) using all 51 subjects' data with leave-one-out cross-validation per user.</li>
      <li><strong>LSTM</strong>: Treating the key sequence as a time series to see if temporal context beyond bigrams helped — it did, marginally.</li>
    </ul>
    <p>
      The Mahalanobis detector achieved an Equal Error Rate (EER) of around 10–12%, consistent with
      published benchmarks. The Random Forest dropped this to around 7% EER on the same data. The
      LSTM gave similar performance to RF but required far more training data per user to converge.
    </p>

    <h2>Building a Custom Dataset</h2>
    <p>
      The CMU dataset is limited: fixed password, controlled lab environment, 51 subjects. To understand
      real-world performance, I built a Django + Firebase web application where volunteers typed a phrase
      of their choice repeatedly across multiple sessions. The app captured:
    </p>
    <ul>
      <li>Keydown timestamps (milliseconds, via <code>performance.now()</code> in the browser)</li>
      <li>Keyup timestamps</li>
      <li>Character identity (encoded, never stored in plaintext on the server)</li>
    </ul>
    <p>
      I collected data from 20 participants over 2 weeks. The dataset was noisier than CMU — participants
      typed at different times of day, on different devices, and were sometimes distracted. This reflected
      reality far better.
    </p>

    <h2>Visualisations That Told the Story</h2>
    <p>
      Plotting the hold-time distributions for each character per user revealed tight Gaussian clusters
      for most users on most keys, with clear separation between users on high-frequency characters like
      'e', 't', and space. Flight times were more variable but still showed consistent inter-user differences.
    </p>
    <p>
      The most instructive visualisation was a t-SNE projection of all samples from 5 users. Even in 2D,
      the per-user clusters were largely separable — a visual confirmation that the signal was real.
    </p>

    <h2>Results and Limitations</h2>
    <p>
      On the custom dataset, the best model (Random Forest) achieved ~14% EER — higher than CMU, which
      was expected given the noise. The main failure modes were:
    </p>
    <ul>
      <li><strong>Device variability</strong>: Keyboard hardware affects timing. A user's laptop keyboard timing differed from their mechanical keyboard timing enough to cause false rejections.</li>
      <li><strong>Fatigue and context</strong>: Late-night typing samples were consistently different from morning samples for several users.</li>
      <li><strong>Short passwords</strong>: Fewer than 8 characters gave insufficient data for reliable classification.</li>
    </ul>
    <p>
      Despite these limitations, keystroke dynamics remains a genuinely useful second factor. It is
      passive (requires no extra user action), adds meaningful resistance to credential stuffing, and
      can be deployed entirely in the browser. The right application is not as a standalone authenticator
      but as a continuous re-authentication signal during a session.
    </p>
  </>
)

const post3Content = () => (
  <>
    <p>
      During my internship at Isoport, I deployed a full Django + ReactJS application to AWS in three
      weeks. Since then I have repeated this process for personal projects and improved the approach
      considerably. This is the guide I wish I had had the first time — practical, with the actual
      commands and the reasoning behind each choice.
    </p>

    <h2>Architecture Overview</h2>
    <p>
      The target architecture is:
    </p>
    <ul>
      <li><strong>EC2 (t3.micro or t3.small)</strong>: Runs the Django application server via Gunicorn + Nginx reverse proxy</li>
      <li><strong>RDS (PostgreSQL)</strong>: Managed database — no need to manage backups, patches or replication yourself</li>
      <li><strong>S3</strong>: Static files (Django's <code>collectstatic</code> output) and user-uploaded media</li>
      <li><strong>ReactJS</strong>: Built as a static bundle, served either from S3+CloudFront or directly by Nginx on EC2</li>
    </ul>

    <h2>Step 1: Launch and Configure EC2</h2>
    <p>
      Launch an Ubuntu 22.04 LTS t3.micro instance. In the security group, allow inbound on ports 22
      (SSH, restricted to your IP), 80 (HTTP), and 443 (HTTPS if you add SSL later).
    </p>
    <pre><code>ssh -i your-key.pem ubuntu@your-ec2-public-ip
sudo apt update && sudo apt upgrade -y
sudo apt install python3-pip python3-venv nginx git -y</code></pre>
    <p>
      Clone your repository, create a virtual environment, and install dependencies:
    </p>
    <pre><code>git clone https://github.com/yourusername/your-project.git
cd your-project
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn</code></pre>

    <h2>Step 2: Set Up RDS PostgreSQL</h2>
    <p>
      In the AWS console, create a PostgreSQL RDS instance. Key settings:
    </p>
    <ul>
      <li>Use the same VPC as your EC2 instance</li>
      <li>Create a dedicated security group allowing PostgreSQL (port 5432) only from your EC2 security group — never from 0.0.0.0/0</li>
      <li>Enable automated backups with a 7-day retention window</li>
      <li>Note the endpoint hostname — you will use it in Django settings</li>
    </ul>
    <p>
      Update your Django <code>settings.py</code>:
    </p>
    <pre><code>DATABASES = {'{'}
    'default': {'{'}
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('DB_NAME'),
        'USER': os.environ.get('DB_USER'),
        'PASSWORD': os.environ.get('DB_PASSWORD'),
        'HOST': os.environ.get('DB_HOST'),  # RDS endpoint
        'PORT': '5432',
    {'}'}
{'}'}</code></pre>
    <p>
      Store credentials in a <code>.env</code> file on EC2, never in source control. Use
      <code>python-decouple</code> or <code>django-environ</code> to load them.
    </p>

    <h2>Step 3: S3 for Static and Media Files</h2>
    <p>
      Create an S3 bucket, disable "Block all public access" for the static files bucket, and attach
      a bucket policy allowing public read on the <code>static/</code> prefix. For media files
      (user uploads) keep them private and use presigned URLs.
    </p>
    <p>
      Install and configure <code>django-storages</code>:
    </p>
    <pre><code>pip install django-storages boto3</code></pre>
    <pre><code># settings.py
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3StaticStorage'
AWS_STORAGE_BUCKET_NAME = os.environ.get('AWS_BUCKET_NAME')
AWS_S3_REGION_NAME = 'ap-south-1'
AWS_DEFAULT_ACL = None</code></pre>
    <p>
      Then run <code>python manage.py collectstatic</code> — Django will upload all static files to S3.
    </p>

    <h2>Step 4: Gunicorn + Nginx</h2>
    <p>
      Create a systemd service for Gunicorn at <code>/etc/systemd/system/gunicorn.service</code>:
    </p>
    <pre><code>[Unit]
Description=Gunicorn daemon for Django
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/your-project
ExecStart=/home/ubuntu/your-project/venv/bin/gunicorn \
    --workers 3 \
    --bind unix:/home/ubuntu/your-project/gunicorn.sock \
    your_project.wsgi:application
Restart=always

[Install]
WantedBy=multi-user.target</code></pre>
    <pre><code>sudo systemctl start gunicorn
sudo systemctl enable gunicorn</code></pre>
    <p>
      Configure Nginx at <code>/etc/nginx/sites-available/your-project</code>:
    </p>
    <pre><code>server {'{'}
    listen 80;
    server_name your-domain.com;

    location /static/ {'{'}
        proxy_pass https://your-bucket.s3.amazonaws.com/static/;
    {'}'}

    location /api/ {'{'}
        proxy_pass http://unix:/home/ubuntu/your-project/gunicorn.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    {'}'}

    location / {'{'}
        root /home/ubuntu/your-project/frontend/dist;
        try_files $uri /index.html;
    {'}'}
{'}'}</code></pre>

    <h2>Step 5: Build and Deploy the React Frontend</h2>
    <p>
      Build the React app locally (or on EC2) and copy the dist folder:
    </p>
    <pre><code>npm run build
scp -i your-key.pem -r dist/ ubuntu@your-ec2-ip:/home/ubuntu/your-project/frontend/</code></pre>
    <p>
      The Nginx config above serves the React bundle from <code>/home/ubuntu/your-project/frontend/dist</code>
      and falls back to <code>index.html</code> for client-side routing. The <code>/api/</code> prefix
      routes Django API calls to Gunicorn. This setup means a single EC2 instance handles both the
      React SPA and the Django API.
    </p>

    <h2>Common Pitfalls</h2>
    <ul>
      <li><strong>CORS errors</strong>: Install <code>django-cors-headers</code> and add your frontend origin to <code>CORS_ALLOWED_ORIGINS</code>.</li>
      <li><strong>DEBUG = True in production</strong>: Set it to False and set <code>ALLOWED_HOSTS</code> properly. Django will serve no responses otherwise.</li>
      <li><strong>Static files 403 on S3</strong>: The bucket policy must explicitly allow <code>s3:GetObject</code> on the <code>static/*</code> prefix for the <code>*</code> principal.</li>
      <li><strong>RDS connection refused</strong>: The most common cause is a security group misconfiguration. The EC2 security group ID must be listed as the source in the RDS inbound rule, not the EC2 IP address.</li>
    </ul>
    <p>
      Once this baseline is running, the natural next steps are adding an Application Load Balancer,
      moving to ECS containers, and attaching a CloudFront distribution in front of S3. But for a
      personal project or small production app, this single-instance setup is robust, cheap (under
      $15/month for t3.micro + db.t3.micro RDS), and easy to reason about.
    </p>
  </>
)

const post4Content = () => (
  <>
    <p>
      In February 2021, I was a final-year ECE student at VJTI Mumbai with no formal Computer Science
      degree, staring at a GATE CS syllabus that included subjects I had never studied — Operating
      Systems, Compiler Design, Theory of Computation. Five months later I had AIR 800 in GATE CS 2021.
      This is exactly what I did.
    </p>

    <h2>Why GATE CS as an ECE Student?</h2>
    <p>
      I had taught myself programming through projects, but a GATE CS score would open doors to both
      PSU jobs and top-tier M.Tech programmes that an ECE GATE score would not. More practically, I
      wanted to validate my CS knowledge against a rigorous standard. The exam covers algorithms, data
      structures, OS, DBMS, networks, compilers, digital logic, and discrete mathematics — a solid
      foundation that I knew would make me a better engineer.
    </p>

    <h2>The Honest Starting Point</h2>
    <p>
      I started in late September 2020 — five months before the exam. My strengths as an ECE student:
    </p>
    <ul>
      <li>Digital Logic and Computer Organisation (overlaps with ECE curriculum)</li>
      <li>Mathematics — Discrete Maths, Linear Algebra, Probability</li>
      <li>Basic Data Structures and Algorithms from self-study</li>
    </ul>
    <p>
      My weaknesses: Operating Systems (had never formally studied scheduling, paging, deadlocks),
      Compiler Design (completely new), Theory of Computation (had done automata briefly in ECE,
      but GATE goes far deeper), and DBMS (knew SQL from projects but not relational algebra or
      normalisation theory).
    </p>

    <h2>Resources I Used (and Honest Reviews)</h2>
    <h3>NPTEL Video Lectures</h3>
    <p>
      Free, authoritative, and comprehensive. I used NPTEL for OS (the IIT Bombay series by Prof.
      Mythili Vutukuru is exceptional), Compiler Design, and TOC. Watch at 1.5x speed, pause and
      work through examples yourself.
    </p>
    <h3>GateSmashers YouTube Channel</h3>
    <p>
      Fantastic for quick conceptual clarity on DBMS and OS. The videos are concise and exam-focused.
      I used this to supplement NPTEL, not replace it.
    </p>
    <h3>GeeksForGeeks GATE CS Section</h3>
    <p>
      An invaluable reference. Every previous year's GATE question is explained here. I read every
      tagged article for each topic after completing a subject. The quality varies, but the breadth
      is unmatched.
    </p>
    <h3>CLRS (Introduction to Algorithms)</h3>
    <p>
      Too dense to read cover-to-cover in five months. I used it as a reference for specific topics:
      dynamic programming chapter, graph algorithms, and amortised analysis. For exam prep, the
      NPTEL algorithms course is more efficient.
    </p>
    <h3>Previous Year Papers (2010–2020)</h3>
    <p>
      The single most important resource. Start solving these from week 6 onwards. GATE rewards deep
      conceptual understanding tested through specific edge cases — previous papers show exactly which
      edge cases appear repeatedly.
    </p>

    <h2>My Weekly Schedule (September–January)</h2>
    <p>
      I was simultaneously finishing my B.Tech final year, so time was limited. My target was 4–5 hours
      of GATE preparation per day, 6 days a week.
    </p>
    <ul>
      <li><strong>Monday–Wednesday</strong>: New topic — video lectures + notes + GeeksForGeeks articles</li>
      <li><strong>Thursday–Friday</strong>: Previous year questions on recent topics + weak area revision</li>
      <li><strong>Saturday</strong>: Full mock test (3 hours) + error analysis</li>
      <li><strong>Sunday</strong>: Rest and light revision of the week's notes</li>
    </ul>
    <p>
      I made handwritten notes for everything except Algorithms (where I used GeeksForGeeks printouts
      annotated by hand). The act of writing forces understanding in a way passive watching does not.
    </p>

    <h2>Subject-Specific Tips</h2>
    <h3>Algorithms and Data Structures</h3>
    <p>
      Master time complexity analysis (Master theorem, recurrence solving), sorting algorithms, graph
      traversals (BFS/DFS and their applications), shortest path (Dijkstra, Bellman-Ford), MST
      (Kruskal, Prim), dynamic programming patterns, and hashing. GATE regularly asks questions
      about the exact number of operations in a specific algorithm run — practise counting.
    </p>
    <h3>Operating Systems</h3>
    <p>
      CPU scheduling (average waiting time, turnaround time calculations), memory management (page
      replacement algorithms — LRU, FIFO, Optimal — with specific reference string questions),
      deadlock detection and Banker's algorithm, and process synchronisation (semaphore solutions
      to classical problems). These topics have very high question density.
    </p>
    <h3>DBMS</h3>
    <p>
      Relational algebra (learn all the operators), normalisation up to BCNF (practise identifying
      functional dependencies and candidate keys), SQL queries (including joins, aggregation, nested
      queries), and transaction management (serializability, conflict serialisability, 2PL).
    </p>
    <h3>Compiler Design</h3>
    <p>
      Many ECE students skip this — do not. First and Follow sets, SLR/CLR/LALR parsing, and basic
      code generation appear every year. Watch the NPTEL lectures, then immediately solve previous
      year questions. This subject has a steep initial curve but becomes very mechanical once the
      algorithm is clear.
    </p>

    <h2>The Final Month</h2>
    <p>
      In January, I stopped learning new material and focused entirely on:
    </p>
    <ul>
      <li>One full mock test every two days (from MADE Easy, Testbook, or official GATE Virtual Calculator practice)</li>
      <li>Reviewing every wrong answer with a written explanation of why the correct answer is correct</li>
      <li>Rapid revision of my notes — one subject per day cycling through all subjects</li>
    </ul>
    <p>
      By the time exam day arrived, I had solved approximately 1400 previous year questions and 6 full
      mocks. The actual exam felt familiar — not easy, but familiar.
    </p>

    <h2>Exam Day Strategy</h2>
    <p>
      GATE CS has 65 questions in 3 hours: 10 General Aptitude (worth 15 marks) and 55 CS questions
      (worth 85 marks). Negative marking is 1/3 for 1-mark questions and 2/3 for 2-mark questions.
    </p>
    <ul>
      <li>Spend the first 10 minutes reading all questions and marking difficulty — easy, medium, hard</li>
      <li>Solve all easy questions first, then medium, then attempt hard questions with remaining time</li>
      <li>Do not guess on questions you have no idea about — the penalty is real at this level</li>
      <li>Reserve 20 minutes at the end for review of marked answers</li>
    </ul>

    <h2>What Actually Mattered</h2>
    <p>
      Looking back, three things made the difference: starting early enough to go deep rather than wide,
      solving an enormous volume of previous year questions, and treating every wrong answer as a learning
      event rather than a discouragement. The subjects themselves are not impossibly hard. What GATE tests
      is precision — the ability to apply a concept correctly under time pressure. That precision comes
      only from repetition.
    </p>
    <p>
      If you are an ECE student considering GATE CS: it is absolutely achievable, your background in
      Digital Logic and Maths is a genuine advantage, and the preparation will make you a significantly
      better programmer regardless of the outcome.
    </p>
  </>
)

export const posts = [
  {
    id: 'lte-mac-scheduling-qos',
    title: 'LTE MAC Layer Demystified: Scheduling & QoS',
    category: 'Telecom',
    date: 'March 2024',
    readTime: '10 min read',
    excerpt:
      'A deep dive into LTE MAC scheduling algorithms — from simple Round Robin to QCI-aware proportional fair schedulers — and how power allocation works in the uplink.',
    Content: post1Content,
  },
  {
    id: 'keystroke-dynamics-authentication',
    title: 'Using Keystroke Dynamics for Continuous Authentication',
    category: 'Machine Learning',
    date: 'November 2023',
    readTime: '9 min read',
    excerpt:
      'How I trained ML models on the CMU benchmark dataset and a custom-built dataset to authenticate users by the way they type — and what the real-world limitations are.',
    Content: post2Content,
  },
  {
    id: 'django-reactjs-aws-deployment',
    title: 'Deploying Django + ReactJS on AWS (EC2, RDS, S3)',
    category: 'DevOps',
    date: 'August 2023',
    readTime: '12 min read',
    excerpt:
      'A practical, command-by-command guide to deploying a full Django + React application on AWS using EC2, RDS PostgreSQL, and S3 for static and media files.',
    Content: post3Content,
  },
  {
    id: 'gate-cs-2021-air-800',
    title: 'How I Cracked GATE CS 2021 with AIR 800',
    category: 'Career',
    date: 'May 2023',
    readTime: '11 min read',
    excerpt:
      'My complete GATE CS preparation strategy as an ECE student — resources, weekly schedule, subject-specific tips, and the exam-day approach that led to AIR 800.',
    Content: post4Content,
  },
]
