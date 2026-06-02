// IT Learning Platform - Global Application State & Logic (3 Courses & 5 Stages Restructured)

// --- INITIALIZE DEFAULT DATA ---
const DEFAULT_COURSES = [
    { id: 'python', title: 'Python Әзірлеу', icon: '🐍', desc: 'Python бағдарламалау негіздерін үйреніңіз: айнымалылардан бастап финалдық шағын жоба жасауға дейін.', lessonsCount: 5 },
    { id: 'cisco', title: 'Cisco Packet Tracer', icon: '🌐', desc: 'Желілерді жобалау және модельдеу. IP-адрестеуді, маршрутизаторларды баптау және жұмыс істейтін желі құру.', lessonsCount: 5 },
    { id: 'arvr', title: 'AR/VR Технологиялары', icon: '🕶️', desc: 'Толықтырылған және виртуалды шындық әлемі. Құрылғыларды, 3D-көріністерді үйреніп, финалдық жобаны жинаңыз.', lessonsCount: 5 }
];

const DEFAULT_LESSONS = [
    // === COURSE: PYTHON ===
    {
        id: 'py_1',
        courseId: 'python',
        stage: 1,
        title: '1-кезең. Кіріспе: print, input, айнымалылар',
        readTime: '8 мин',
        content: `
            <h2>Python негіздері</h2>
            <p>Деректерді енгізу және шығару — кез келген бағдарламаның негізгі операциялары. Бұл кезеңде біз айнымалыларды, сондай-ақ кірістірілген <code>print()</code> және <code>input()</code> функцияларын қарастырамыз.</p>
            
            <h3>print() функциясы</h3>
            <p>Экранға ақпарат шығару үшін қолданылады. Оған жолдарды, сандарды және айнымалылардың мәндерін бере аласыз.</p>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>print("Сәлем, әлем!")
print(2026)
print("Нәтиже:", 5 + 5)</pre>
            </div>
            
            <h3>input() функциясы</h3>
            <p>Пайдаланушы пернетақтадан енгізген деректерді оқуға мүмкіндік береді. Әрқашан мәтіндік жолды (<code>str</code> типі) қайтарады.</p>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>name = input("Атыңызды енгізіңіз: ")
print("Сәлем,", name)</pre>
            </div>
            
            <h3>Айнымалылар</h3>
            <p>Python-да айнымалының типін нақты көрсетудің қажеті жоқ (динамикалық типтеу). Айнымалы оған мән тағайындалған кезде жасалады.</p>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>age = 17          # Бүтін сан (int)
height = 1.75     # Бөлшек сан (float)
city = "Алматы"   # Жол (str)</pre>
            </div>
        `,
        quizzes: []
    },
    {
        id: 'py_2',
        courseId: 'python',
        stage: 2,
        title: '2-кезең. Шарттар: if, else, elif',
        readTime: '10 мин',
        content: `
            <h2>Python-дағы тармақталу конструкциялары</h2>
            <p>Шартты оператор белгілі бір шарттардың ақиқаттығына байланысты әртүрлі код блоктарын орындауға мүмкіндік береді.</p>
            
            <h3>if, elif, else синтаксисі</h3>
            <p>Python-да код блоктары <strong>шегіністермен</strong> (әдетте 4 бос орын) ерекшеленеді, ал шарттар қос нүктемен <code>:</code> аяқталады.</p>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>score = int(input("Ұпайыңызды енгізіңіз: "))

if score >= 90:
    print("Өте жақсы!")
elif score >= 70:
    print("Жақсы!")
elif score >= 50:
    print("Қанағаттанарлық.")
else:
    print("Тағы байқап көріңіз.")</pre>
            </div>
            
            <h3>Салыстыру және логикалық операторлар</h3>
            <ul>
                <li><code>==</code> (теңдік), <code>!=</code> (теңсіздік)</li>
                <li><code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code></li>
                <li>Логикалық байланыстар: <code>and</code> (ЖӘНЕ), <code>or</code> (НЕМЕСЕ), <code>not</code> (ЕМЕС)</li>
            </ul>
        `,
        quizzes: []
    },
    {
        id: 'py_3',
        courseId: 'python',
        stage: 3,
        title: '3-кезең. Циклдер: for, while',
        readTime: '12 мин',
        content: `
            <h2>Кодты қайталау: Циклдер</h2>
            <p>Циклдер бірдей әрекеттер тізбегін бірнеше рет орындау қажет болғанда қолданылады.</p>
            
            <h3>for циклі</h3>
            <p>Әдетте тізбек элементтерін қарап шығу немесе <code>range()</code> көмегімен сандық диапазонда жұмыс істеу үшін қолданылады.</p>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre># 0-ден 4-ке дейінгі сандарды шығарады
for i in range(5):
    print("Есептегіш мәні:", i)</pre>
            </div>
            
            <h3>while циклі</h3>
            <p>Код блогын шарт ақиқат (True) болғанша орындайды.</p>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>count = 1
while count <= 3:
    print("Қадам №", count)
    count += 1</pre>
            </div>
        `,
        quizzes: []
    },
    {
        id: 'py_4',
        courseId: 'python',
        stage: 4,
        title: '4-кезең. Тізімдер',
        readTime: '11 мин',
        content: `
            <h2>Python-дағы тізімдер (List)</h2>
            <p>Тізім — кез келген типтегі деректерді сақтай алатын, реттелген, өзгертілетін элементтер жиыны. Тізім элементтері тік жақшаға <code>[]</code> жазылады.</p>
            
            <h3>Құру және негізгі операциялар</h3>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>fruits = ["алма", "банан", "апельсин"]
print(fruits[0]) # Шығарады: алма (индекстеу 0-ден басталады)</pre>
            </div>
            
            <h3>Тізімдермен жұмыс істеу әдістері</h3>
            <ul>
                <li><code>append(item)</code> — элементті тізімнің соңына қосады.</li>
                <li><code>remove(item)</code> — элементтің бірінші кездескен нұсқасын тізімнен өшіреді.</li>
                <li><code>len(list)</code> — тізімнің ұзындығын (элементтер санын) қайтарады.</li>
            </ul>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>numbers = [10, 20]
numbers.append(30)
print(len(numbers)) # Шығарады: 3</pre>
            </div>
        `,
        quizzes: []
    },
    {
        id: 'py_5',
        courseId: 'python',
        stage: 5,
        title: '5-кезең. Финалдық шағын жоба',
        readTime: '15 мин',
        content: `
            <h2>Мәтіндік калькулятор жасау</h2>
            <p>Құттықтаймыз! Сіз Python курсының финалына жеттіңіз. Қорытынды тапсырма ретінде біз пайдаланушыдан екі сан мен операция белгісін сұрап, нәтижені шығаратын калькулятор жинаймыз.</p>
            
            <h3>Жобаның толық коды:</h3>
            <div class="code-block-wrapper">
                <span class="code-lang-label">python</span>
                <pre>num1 = float(input("Бірінші санды енгізіңіз: "))
operation = input("Операцияны енгізіңіз (+, -, *, /): ")
num2 = float(input("Екінші санды енгізіңіз: "))

if operation == '+':
    result = num1 + num2
elif operation == '-':
    result = num1 - num2
elif operation == '*':
    result = num1 * num2
elif operation == '/':
    if num2 != 0:
        result = num1 / num2
    else:
        result = "Қате: нөлге бөлу!"
else:
    result = "Қате операция"

print("Нәтиже:", result)</pre>
            </div>
            <p>Жоғарыдағы кодты талдаңыз. Ол барлық үйренген дағдыларды пайдаланады: деректерді енгізу-шығару, типтерді түрлендіру, шартты конструкциялар және математикалық операциялар.</p>
        `,
        quizzes: []
    },

    // === COURSE: CISCO PACKET TRACER ===
    {
        id: 'cisco_1',
        courseId: 'cisco',
        stage: 1,
        title: '1-кезең. Желі негіздері: роутер, хаб, свитч, сервер, компьютер',
        readTime: '12 мин',
        content: `
            <h2>Cisco Packet Tracer-дегі желілік жабдықтар</h2>
            <p>Компьютерлік желі байланыс орнататын соңғы түйіндер мен аралық құрылғылардан тұрады. Негізгі элементтерді талдайық:</p>
            
            <h3>1. Компьютер (PC) / Соңғы құрылғылар</h3>
            <p>Желідегі ақпарат көздері мен алушылары (ДК, ноутбуктер, принтерлер, смартфондар).</p>
            
            <h3>2. Хаб (Концентратор)</h3>
            <p>Физикалық деңгейдегі ескірген құрылғы. Бір портқа деректер алып, оларды БАРЛЫҚ басқа порттарға көбейтеді. Тиімсіз, коллизиялар тудырады.</p>
            
            <h3>3. Свитч (Коммутатор)</h3>
            <p>Арналық деңгейдің (L2) зияткерлік құрылғысы. MAC-мекенжайларын талдайды және артық трафикті болдырмай, деректерді қатаң түрде алушыға жібереді.</p>
            
            <h3>4. Роутер (Маршрутизатор)</h3>
            <p>Желілік деңгей құрылғысы (L3). Әртүрлі желілерді байланыстырады және IP-мекенжайлар негізінде пакеттерді жеткізудің ең жақсы бағытын анықтайды.</p>
            
            <h3>5. Сервер</h3>
            <p>Клиенттерге белгілі专门 қызметтерді (веб-беттер, мәліметтер базасы, IP-мекенжайлар) ұсынатын қуатты компьютер.</p>
        `,
        quizzes: []
    },
    {
        id: 'cisco_2',
        courseId: 'cisco',
        stage: 2,
        title: '2-кезең. IP-адрестеу: IP, шлюз, DNS, жергілікті желі',
        readTime: '10 мин',
        content: `
            <h2>Желілердегі адрестеу негіздері</h2>
            <p>Құрылғылар хабарлама алмасуы үшін олардың әрқайсысының бірегей мекенжайы болуы керек.</p>
            
            <h3>IP-мекенжай</h3>
            <p>Желідегі құрылғының бірегей сандық идентификаторы. Ең танымал стандарт — IPv4 (мысалы, <code>192.168.1.5</code>).</p>
            
            <h3>Ішкі желі маскасы (Subnet Mask)</h3>
            <p>IP-мекенжайдың қай бөлігі желі мекенжайына, ал қай бөлігі түйіннің өзіне тиесілі екенін анықтайды (мысалы, <code>255.255.255.0</code> маскасы алғашқы үш октеттің желі мекенжайы екенін білдіреді).</p>
            
            <h3>Негізгі шлюз (Default Gateway)</h3>
            <p>Егер компьютер пакетті өз жергілікті желісінен тыс (Интернетке) жіберуі керек болса, ол жүгінетін роутердің IP-мекенжайы.</p>
            
            <h3>DNS-сервер</h3>
            <p>Адамға түсінікті домендік атауларды (yandex.kz) сандық IP-мекенжайларға түрлендіретін сервер.</p>
        `,
        quizzes: []
    },
    {
        id: 'cisco_3',
        courseId: 'cisco',
        stage: 3,
        title: '3-кезең. CLI арқылы роутерді баптау',
        readTime: '13 мин',
        content: `
            <h2>Cisco маршрутизаторларын конфигурациялау</h2>
            <p>Cisco роутерлері пәрмен жолы интерфейсі (CLI) арқылы бапталады. Интерфейсті іске қосу және IP тағайындау үшін негізгі пәрмендерді қарастырайық.</p>
            
            <h3>Интерфейсті баптау алгоритмі:</h3>
            <ol>
                <li>Артықшылықты режимге кіру: <code>enable</code></li>
                <li>Конфигурация режиміне кіру: <code>configure terminal</code></li>
                <li>Интерфейсті таңдау: <code>interface GigabitEthernet0/0</code></li>
                <li>IP және маска тағайындау: <code>ip address 192.168.1.1 255.255.255.0</code></li>
                <li>Портты қосу (әдепкі бойынша олар өшірулі): <code>no shutdown</code></li>
            </ol>
            
            <div class="code-block-wrapper">
                <span class="code-lang-label">Cisco CLI</span>
                <pre>Router> enable
Router# configure terminal
Router(config)# interface GigabitEthernet 0/0
Router(config-if)# ip address 192.168.1.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# end
Router# write memory  (баптауларды сақтау)</pre>
            </div>
        `,
        quizzes: []
    },
    {
        id: 'cisco_4',
        courseId: 'cisco',
        stage: 4,
        title: '4-кезең. Серверлер мен қызметтер: DHCP, DNS, Web Server',
        readTime: '11 мин',
        content: `
            <h2>Желілік қызметтер</h2>
            <p>Cisco Packet Tracer-де негізгі желілік қызметтерді орналастыру үшін виртуалды серверді баптай аласыз.</p>
            
            <h3>DHCP (Dynamic Host Configuration Protocol)</h3>
            <p>Жергілікті желідегі барлық жаңа компьютерлерге IP-мекенжайларды, маскаларды және шлюздерді автоматты түрде таратып, әкімшіні қолмен баптаудан босатады.</p>
            
            <h3>DNS (Domain Name System)</h3>
            <p>Мәтіндік домендік атауларды IP-мекенжайлармен сәйкестендіреді. Сервердегі DNS қызметінің баптауларында жазба жасалады, мысалы: <code>www.itlearn.local</code> -> <code>192.168.1.100</code>.</p>
            
            <h3>HTTP / Web Server</h3>
            <p>HTML беттерін сақтайтын сервер. **Services -> HTTP** қойындысы index.html файлын өңдеуге мүмкіндік береді. Егер ДК-ден браузерге сервердің IP-мекенжайын енгізсеңіз, осы бет ашылады.</p>
        `,
        quizzes: []
    },
    {
        id: 'cisco_5',
        courseId: 'cisco',
        stage: 5,
        title: '5-кезең. Финалдық жоба: қарапайым желі құру',
        readTime: '15 мин',
        content: `
            <h2>Желіні толық жинау және тексеру</h2>
            <p>Желілерді жобалау дағдыларын бекітуге арналған қорытынды тапсырма.</p>
            
            <h3>Желі архитектурасы:</h3>
            <ul>
                <li>Жұмыс аймағына орналастырыңыз: <strong>1 роутер 2911</strong>, <strong>1 свитч 2960</strong>, <strong>2 компьютер (PC)</strong> және <strong>1 сервер</strong>.</li>
                <li>Компьютерлер мен серверді свитчке қосыңыз, ал свитчті роутердің GigabitEthernet0/0 портына қосыңыз.</li>
                <li>Роутер портын баптаңыз: IP <code>192.168.10.1</code>, маска <code>255.255.255.0</code>. <code>no shutdown</code> пәрменін орындаңыз.</li>
                <li>Серверде DHCP қызметін баптаңыз (мекенжайлар пулын, шлюзді <code>192.168.10.1</code> көрсетіңіз). Қызметті қосыңыз.</li>
                <li>PC0 және PC1-ге өтіп, IP баптауларын Static-тен DHCP-ге ауыстырыңыз. Олардың <code>192.168.10.X</code> түріндегі мекенжайларды алғанына көз жеткізіңіз.</li>
                <li>PC0-ден PC1-ге және роутерге пинг орындаңыз. Желі сәтті жобаланды және жұмыс істейді!</li>
            </ul>
        `,
        quizzes: []
    },

    // === COURSE: AR/VR ===
    {
        id: 'arvr_1',
        courseId: 'arvr',
        stage: 1,
        title: '1-кезең. AR және VR дегеніміз не',
        readTime: '8 мин',
        content: `
            <h2>Иммерсивті технологияларға ену</h2>
            <p>Қазіргі технологиялар цифрлық және физикалық әлем арасындағы шекараны жояды. Оларға нақты анықтама берейік.</p>
            
            <h3>VR (Virtual Reality — Виртуальды шындық)</h3>
            <p>Пайдаланушыны физикалық шындықтан толық оқшаулайтын жасанды әлем құратын технология. Қабылдау бас пен қолдың қозғалысын қадағалайтын дулығалар (VR гарнитуралары) арқылы жүзеге асады.</p>
            
            <h3>AR (Augmented Reality — Толықтырылған шындық)</h3>
            <p>Виртуалды нысандарды (3D-модельдер, мәтін, интерфейстер) смартфон экраны немесе арнайы мөлдір көзілдірік арқылы нақты ортаға қабаттастыратын технология.</p>
            
            <h3>Негізгі айырмашылық:</h3>
            <p>VR толығымен жаңа цифрлық әлем жасайды, ал AR физикалық әлемді виртуалды бөлшектермен толықтырады.</p>
        `,
        quizzes: []
    },
    {
        id: 'arvr_2',
        courseId: 'arvr',
        stage: 2,
        title: '2-кезең. VR құрылғылары',
        readTime: '10 мин',
        content: `
            <h2>Қазіргі заманғы гарнитуралар мен жабдықтар</h2>
            <p>Виртуалды кеңістікпен өзара әрекеттесу үшін әртүрлі дулығалар мен контроллерлер қолданылады.</p>
            
            <h3>VR құрылғыларының негізгі санаттары:</h3>
            <ul>
                <li><strong>Дербес (Stand-alone) дулығалар:</strong> өзінің процессоры, аккумуляторы және жады бар. ДК-ге қосылуды қажет етпейді (мысалы, Meta Quest, Pico 4). Бұл ең танымал формат.</li>
                <li><strong>Сымды (PC VR) дулығалар:</strong> қуатты компьютерге кабель арқылы қосылады. ДК ресурстары есебінен ең жақсы графика сапасын қамтамасыз етеді (мысалы, HTC Vive Pro, Valve Index).</li>
            </ul>
            
            <h3>Бақылау жүйелері (Tracking)</h3>
            <p>Гарнитуралар кеңістіктегі орынды еркіндіктің 6 дәрежесі (6 DOF) бойынша — алға/артқа, солға/оңға, жоғары/төмен жылжу және бастың бұрылуын қадағалау үшін датчиктер мен сыртқы немесе кіріктірілген камераларды (Inside-out tracking) пайдаланады.</p>
        `,
        quizzes: []
    },
    {
        id: 'arvr_3',
        courseId: 'arvr',
        stage: 3,
        title: '3-кезең. AR/VR қайда қолданылады',
        readTime: '9 мин',
        content: `
            <h2>Иммерсивті технологияларды қолдану салалары</h2>
            <p>Кең таралған пікірге қарамастан, AR/VR — бұл тек бейне ойындар емес. Технологиялар көптеген салаларда белсенді дамып келеді:</p>
            
            <h3>Медицина</h3>
            <p>Медицина студенттеріне арналған хирургиялық операцияларды симуляциялау. Дәрігерлер нақты араласу алдында органның егжей-тегжейлі 3D-моделінде тәжірибе жасай алады.</p>
            
            <h3>Өнеркәсіп және инженерия</h3>
            <p>Автомобильдер мен ұшақтарды құрастыру. Инженерлер виртуалды прототиптер жасап, олардың аэродинамикасын немесе эргономикасын тексереді.</p>
            
            <h3>Білім беру</h3>
            <p>Химия сабақтарында ғарышқа, тарихи дәуірлерге немесе молекуланың ішіне виртуалды экскурсиялар.</p>
            
            <h3>Сәулет</h3>
            <p>Құрылыс басталмас бұрын жобаланған тұрғын үй кешендері бойынша виртуалды турлар.</p>
        `,
        quizzes: []
    },
    {
        id: 'arvr_4',
        courseId: 'arvr',
        stage: 4,
        title: '4-кезең. 3D-көріністер негіздері',
        readTime: '12 мин',
        content: `
            <h2>Үш өлшемді әлемдер құру</h2>
            <p>Кез келген VR көрінісі ойын қозғалтқышында (мысалы, Unity немесе Unreal Engine) жасалады. 3D-кеңістіктің негізгі ұғымдарын қарастырайық:</p>
            
            <h3>Координаттар торы</h3>
            <p>Нысандардың орналасуы үш координатамен беріледі: <strong>X</strong> (ені), <strong>Y</strong> (биіктігі), <strong>Z</strong> (тереңдігі).</p>
            
            <h3>Ойын нысандары (GameObjects)</h3>
            <p>Көрініс элементтері. Бұл 3D-модельдер, жарық көздері, камералар немесе дыбыстық нүктелер болуы мүмкін.</p>
            
            <h3>Компоненттер (Components)</h3>
            <p>Нысандардың мінез-құлқын анықтайды. Мысалы:</p>
            <ul>
                <li><strong>Transform:</strong> позиция, айналу және масштаб.</li>
                <li><strong>Mesh Filter & Renderer:</strong> 3D моделінің сыртқы түрі.</li>
                <li><strong>Collider:</strong> соқтығысуларды өңдеуге арналған нысанның физикалық шекаралары.</li>
                <li><strong>Rigidbody:</strong> нысанға физика (гравитация, масса) береді.</li>
            </ul>
        `,
        quizzes: []
    },
    {
        id: 'arvr_5',
        courseId: 'arvr',
        stage: 5,
        title: '5-кезең. Финалдық жоба',
        readTime: '15 мин',
        content: `
            <h2>Unity-де интерактивті бөлме жасау</h2>
            <p>Сіз AR/VR курсын аяқтап жатырсыз! Сіздің финалдық тапсырмаңыз — пайдаланушы виртуалды заттарды қолымен ала алатын көріністі жобалау.</p>
            
            <h3>Жобаны әзірлеудің қадамдық жоспары:</h3>
            <ol>
                <li>Unity-де жаңа 3D-жоба жасаңыз. <strong>XR Plugin Management</strong> және <strong>XR Interaction Toolkit</strong> пакеттерін импорттаңыз.</li>
                <li>Көрініске тегіс еден (Plane) қосып, оған ағаш немесе бетон текстурасын салыңыз.</li>
                <li>Стандартты камераны (Main Camera) өшіріңіз. Оның орнына XR мәзірінен <strong>XR Origin (Action-based)</strong> нысанын қосыңыз. Ол дулыға мен реттелген енгізуі бар қол контроллерлерін жасайды.</li>
                <li>3D үстел (Cube) жасап, оның үстіне доп (Sphere) қойыңыз.</li>
                <li>Допқа <code>Rigidbody</code> және <code>XR Grab Interactable</code> компоненттерін қосыңыз. Бұл физикаға допты басқаруға, ал контроллерлерге — триггерді басқан кезде оны алуға автоматты түрде мүмкіндік береді.</li>
                <li>Тестілеу режимін іске қосыңыз. Сіз бөлмені қарап, үстелден заттарды ала аласыз!</li>
            </ol>
        `,
        quizzes: []
    }
];

const DEFAULT_LEADERBOARD = [
    { name: 'Айгерім Мақсатқызы', progress: 100, score: 1500, avatar: 'АМ' },
    { name: 'Азамат Серікұлы', progress: 80, score: 1200, avatar: 'АС' },
    { name: 'Нұрлан Бақыт', progress: 0, score: 0, avatar: 'НБ', isCurrentUser: true }, // Syncs dynamically
    { name: 'Айнұр Болатқызы', progress: 60, score: 900, avatar: 'АБ' },
    { name: 'Дәурен Мұратұлы', progress: 40, score: 600, avatar: 'ДМ' }
];

const DEFAULT_FEEDBACK = [
    { name: 'Азамат Серікұлы', date: '25.05.2026', text: 'Cisco Packet Tracer курсы өте керемет. CLI баптаулары консольді түсінуге қатты көмектесті!' },
    { name: 'Айгерім Мақсатқызы', date: '24.05.2026', text: 'Unity қозғалтқышында VR бөлмесін жасау кезеңі қатты ұнады, бәрі бірден жұмыс істеді.' }
];

// --- STORAGE MANAGER ---
const Storage = {
    get: (key, defaultValue) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error('Error reading localStorage', e);
            return defaultValue;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error writing localStorage', e);
        }
    }
};

// --- INITIALIZE APPLICATION STATE ---
function initAppState() {
    if (!localStorage.getItem('lang_kazakh_fixed_v1')) {
        localStorage.clear();
        localStorage.setItem('lang_kazakh_fixed_v1', 'true');
    }

    // We overwrite existing data to ensure translations are applied
    Storage.set('it_courses', DEFAULT_COURSES);
    Storage.set('it_lessons', DEFAULT_LESSONS);
    if (!localStorage.getItem('it_leaderboard')) {
        Storage.set('it_leaderboard', DEFAULT_LEADERBOARD);
    }
    if (!localStorage.getItem('it_feedback')) {
        Storage.set('it_feedback', DEFAULT_FEEDBACK);
    }
    
    // Users database
    if (!localStorage.getItem('it_users')) {
        Storage.set('it_users', [
            { id: 'admin_1', login: 'admin', password: '123', name: 'Мұғалім (Әкімші)', role: 'teacher' },
            { id: 'user_1', login: 'student1', password: '123', name: 'Нұрлан Бақыт', role: 'student' },
            { id: 'user_2', login: 'student2', password: '123', name: 'Айгерім Мақсатқызы', role: 'student' },
            { id: 'user_3', login: 'student3', password: '123', name: 'Азамат Серікұлы', role: 'student' }
        ]);
    }
    
    // Mock student progress
    if (!localStorage.getItem('student_progress_user_1')) {
        Storage.set('student_progress_user_1', { completedLessons: ['py_1', 'py_2', 'cisco_1'], quizScores: {'py_1': 100, 'py_2': 100, 'cisco_1': 100}, totalPoints: 300 });
    }
    if (!localStorage.getItem('student_progress_user_2')) {
        Storage.set('student_progress_user_2', { completedLessons: ['py_1', 'py_2', 'py_3', 'py_4', 'py_5'], quizScores: {'py_1':100,'py_2':100,'py_3':100,'py_4':100,'py_5':100}, totalPoints: 500 });
    }
    if (!localStorage.getItem('student_progress_user_3')) {
        Storage.set('student_progress_user_3', { completedLessons: ['arvr_1', 'arvr_2'], quizScores: {'arvr_1': 100, 'arvr_2': 100}, totalPoints: 200 });
    }

    // Default logged out state
    if (!localStorage.getItem('current_user')) {
        Storage.set('current_user', {
            id: null,
            name: 'Қонақ',
            role: 'guest',
            isLoggedIn: false
        });
    }
}

initAppState();

// --- STATE GETTERS & MUTATORS ---
const AppState = {
    getCourses: () => Storage.get('it_courses'),
    getLessons: () => Storage.get('it_lessons'),
    getFeedback: () => Storage.get('it_feedback'),
    getUsers: () => Storage.get('it_users', []),
    saveUsers: (users) => Storage.get('it_users', users),
    
    getLeaderboard: () => {
        const lb = Storage.get('it_leaderboard');
        const currentUser = AppState.getCurrentUser();
        // Dynamic update current user rank info
        return lb.map(item => {
            if (item.name === currentUser.name) {
                item.isCurrentUser = true;
                const completionRate = AppState.getOverallCompletionRate(currentUser.id);
                item.progress = Math.round(completionRate);
                const progress = AppState.getStudentProgress(currentUser.id);
                item.score = progress.totalPoints;
            } else {
                item.isCurrentUser = false;
            }
            return item;
        }).sort((a, b) => b.score - a.score);
    },
    
    getStudentProgress: (userId) => {
        const uid = userId || AppState.getCurrentUser().id;
        if (!uid) return { completedLessons: [], quizScores: {}, totalPoints: 0 };
        const key = `student_progress_${uid}`;
        let prog = Storage.get(key);
        if (!prog) {
            prog = { completedLessons: [], quizScores: {}, totalPoints: 0 };
            Storage.set(key, prog);
        }
        return prog;
    },
    
    saveStudentProgress: (userId, progress) => {
        Storage.set(`student_progress_${userId}`, progress);
    },

    getCurrentUser: () => Storage.get('current_user'),
    
    setCurrentUser: (user) => {
        Storage.set('current_user', user);
        window.dispatchEvent(new Event('authStateChanged'));
    },
    
    getOverallCompletionRate: (userId) => {
        const lessons = AppState.getLessons();
        const progress = AppState.getStudentProgress(userId);
        if (!lessons.length) return 0;
        return (progress.completedLessons.length / lessons.length) * 100;
    },
    
    getCourseCompletionRate: (courseId, userId) => {
        const lessons = AppState.getLessons().filter(l => l.courseId === courseId);
        const progress = AppState.getStudentProgress(userId);
        if (!lessons.length) return 0;
        const completedCount = lessons.filter(l => progress.completedLessons.includes(l.id)).length;
        return (completedCount / lessons.length) * 100;
    },

    submitFeedback: (name, text) => {
        const feedbacks = Storage.get('it_feedback');
        const now = new Date();
        const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
        feedbacks.unshift({ name, date: dateStr, text });
        Storage.set('it_feedback', feedbacks);
        showToast('Пікір сәтті жіберілді!', 'success');
    },
    
    completeLesson: (lessonId, quizScore = 100) => {
        const user = AppState.getCurrentUser();
        if (!user || !user.isLoggedIn) return false;
        
        const progress = AppState.getStudentProgress(user.id);
        if (!progress.completedLessons.includes(lessonId)) {
            progress.completedLessons.push(lessonId);
            progress.quizScores[lessonId] = quizScore;
            
            // 100 points per stage completion
            progress.totalPoints = progress.completedLessons.length * 100;
            AppState.saveStudentProgress(user.id, progress);
            
            showToast('Сабақ пен тапсырма орындалды! +100 ұпай.', 'success');
            
            // Sync with leaderboard
            const lb = Storage.get('it_leaderboard');
            let found = false;
            const updatedLb = lb.map(item => {
                if (item.name === user.name) {
                    item.score = progress.totalPoints;
                    item.progress = Math.round(AppState.getOverallCompletionRate(user.id));
                    found = true;
                }
                return item;
            });
            if (!found) {
                updatedLb.push({
                    name: user.name,
                    progress: Math.round(AppState.getOverallCompletionRate(user.id)),
                    score: progress.totalPoints,
                    avatar: user.name.substring(0,2).toUpperCase(),
                    isCurrentUser: true
                });
            }
            Storage.set('it_leaderboard', updatedLb);
            return true;
        }
        return false;
    },
    
    addLesson: (courseId, title, readTime, content, quizQuestion, quizOptions, quizAnswerIndex) => {
        const lessons = AppState.getLessons();
        
        // Find stage number: next stage after maximum existing stage in this course
        const courseLessons = lessons.filter(l => l.courseId === courseId);
        const nextStageNum = courseLessons.length + 1;
        
        const newId = `custom_${Date.now()}`;
        const newLesson = {
            id: newId,
            courseId,
            stage: nextStageNum,
            title: `Этап ${nextStageNum}. ${title}`,
            readTime,
            content,
            quizzes: []
        };
        lessons.push(newLesson);
        Storage.set('it_lessons', lessons);
        
        // Update course counter
        const courses = AppState.getCourses();
        const updatedCourses = courses.map(c => {
            if (c.id === courseId) {
                c.lessonsCount = (c.lessonsCount || 0) + 1;
            }
            return c;
        });
        Storage.set('it_courses', updatedCourses);
        
        showToast('Сабақ кезеңі сәтті қосылды!', 'success');
        return true;
    }
};

// --- DYNAMIC NOTIFICATIONS (TOASTS) ---
function showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'danger') icon = '❌';
    
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// --- UTILITIES FOR DOM / THEME ---
document.addEventListener('DOMContentLoaded', () => {
    // Theme setup
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleUI(savedTheme);
    
    // Theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeToggleUI(newTheme);
            showToast(`${newTheme === 'dark' ? 'Қараңғы' : 'Жарық'} тақырып қосылды`);
        });
    }

    // Hamburger menu setup
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    if (hamburger && navLinks) {
        // Create backdrop if it doesn't exist
        let backdrop = document.getElementById('mobile-backdrop');
        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'mobile-backdrop';
            backdrop.className = 'mobile-backdrop';
            document.body.appendChild(backdrop);
        }

        const openMenu = () => {
            hamburger.classList.add('active');
            navLinks.classList.add('mobile-active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeMenu = () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('mobile-active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        };

        hamburger.addEventListener('click', () => {
            if (hamburger.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        backdrop.addEventListener('click', closeMenu);

        // Close on nav link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }
    
    // Auth Check
    updateAuthUI();
    window.addEventListener('authStateChanged', updateAuthUI);
});

function updateThemeToggleUI(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    if (!themeBtn) return;
    
    if (theme === 'dark') {
        themeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.32 11.32l.707.707M12 7a5 5 0 100 10 5 5 0 000-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    } else {
        themeBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }
}

function updateAuthUI() {
    const user = AppState.getCurrentUser();
    const loginNavBtn = document.getElementById('login-nav-btn');
    const studentCabinetBtn = document.getElementById('student-cabinet-btn');
    const bnavLogin = document.getElementById('bnav-login');
    const bnavLoginLabel = document.getElementById('bnav-login-label');
    
    if (user.isLoggedIn) {
        if (loginNavBtn) {
            loginNavBtn.innerHTML = `Шығу (${user.name})`;
            loginNavBtn.onclick = () => {
                AppState.setCurrentUser({ ...user, isLoggedIn: false });
                showToast('Сіз жүйеден шықтыңыз');
                setTimeout(() => window.location.href = 'index.html', 800);
            };
        }
        if (studentCabinetBtn) studentCabinetBtn.style.display = 'inline-flex';

        // Bottom nav: show logged-in state
        if (bnavLogin) {
            bnavLogin.classList.add('logged-in');
            bnavLogin.onclick = () => {
                AppState.setCurrentUser({ ...user, isLoggedIn: false });
                showToast('Сіз жүйеден шықтыңыз');
                setTimeout(() => window.location.href = 'index.html', 800);
            };
        }
        if (bnavLoginLabel) bnavLoginLabel.textContent = user.name.split(' ')[0];
    } else {
        if (loginNavBtn) {
            loginNavBtn.innerHTML = 'Кіру';
            loginNavBtn.onclick = () => openAuthModal();
        }
        if (studentCabinetBtn) studentCabinetBtn.style.display = 'none';

        // Bottom nav: show login
        if (bnavLogin) {
            bnavLogin.classList.remove('logged-in');
            bnavLogin.onclick = () => openAuthModal();
        }
        if (bnavLoginLabel) bnavLoginLabel.textContent = 'Кіру';
    }
}

function openAuthModal() {
    let modal = document.getElementById('auth-modal');
    if (!modal) {
        createAuthModalDOM();
        modal = document.getElementById('auth-modal');
    }
    modal.classList.add('active');
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('active');
}

function createAuthModalDOM() {
    const modalDiv = document.createElement('div');
    modalDiv.id = 'auth-modal';
    modalDiv.className = 'modal-overlay';
    modalDiv.innerHTML = `
        <div class="modal-box">
            <button class="modal-close" onclick="closeAuthModal()">&times;</button>
            <h3 class="modal-title">Платформаға кіру</h3>
            <p class="modal-desc">Өз аккаунтыңызбен кіріңіз. Демо-рұқсаттар: (admin/123, student1/123)</p>
            <form id="auth-form" onsubmit="handleAuthSubmit(event)">
                <div class="form-group">
                    <label class="form-label" for="auth-login">Логин</label>
                    <input class="form-input" type="text" id="auth-login" placeholder="student1" required>
                </div>
                <div class="form-group">
                    <label class="form-label" for="auth-password">Құпиясөз</label>
                    <input class="form-input" type="password" id="auth-password" placeholder="123" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width:100%; margin-top: 10px;">Кіру</button>
            </form>
        </div>
    `;
    document.body.appendChild(modalDiv);
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const login = document.getElementById('auth-login').value;
    const pass = document.getElementById('auth-password').value;
    
    const users = AppState.getUsers();
    const user = users.find(u => u.login === login && u.password === pass);
    
    if (user) {
        AppState.setCurrentUser({
            id: user.id,
            name: user.name,
            role: user.role,
            isLoggedIn: true
        });
        showToast('Сәтті кіру!', 'success');
        closeAuthModal();
        if (user.role === 'teacher') {
            setTimeout(() => window.location.href = 'admin.html', 1000);
        } else {
            setTimeout(() => window.location.href = 'dashboard.html', 1000);
        }
    } else {
        showToast('Қате логин немесе құпиясөз', 'danger');
    }
}
function loginAsStudent(id) {
    const users = AppState.getUsers();
    const user = users.find(u => u.id === id);
    if (user) {
        AppState.setCurrentUser({
            id: user.id,
            name: user.name,
            role: user.role,
            isLoggedIn: true
        });
        showToast('Сәтті кіру!', 'success');
        setTimeout(() => window.location.href = 'dashboard.html', 1000);
    }
}

