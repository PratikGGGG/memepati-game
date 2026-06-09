const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Full 10-Question Complete Multi-Lingual Balanced Matrix
const questions = {
    english: [
        { q: "What element must be present in a Shaadi food menu for relatives to validate it?", options: ["Gulaab Jamun", "Paneer", "Disappointment", "All of the above"], correct: 3 },
        { q: "Complete the line: 'Rishte mein toh hum tumhare ________ lagte hain.'", options: ["Mama", "Baap", "Fufa", "Sasur"], correct: 1 },
        { q: "What is the automatic response of a Desi mother when you say you are stressed?", options: ["Take a nap", "Have some water", "Tum din bhar phone chalao bas!", "Let's see a doctor"], correct: 2 },
        { q: "If Dhoni takes a DRS review after being given out, what happens?", options: ["The umpire is reviewed", "Dhoni leaves fields", "Third umpire panics", "Match gets abandoned"], correct: 0 },
        { q: "What is the speed of an autowallah when he sees a giant speed breaker?", options: ["0 km/h", "Transforms into a rocket", "Formula 1 speed", "Both B and C"], correct: 3 },
        { q: "What is the secondary purpose of an empty Soan Papdi box?", options: ["Storing sewing kits", "Passing to another relative", "Dustbin", "It vanishes"], correct: 1 },
        { q: "Which character gave the college mantra: 'Aal Izz Well'?", options: ["Kabir Singh", "Rancho", "Babu Rao", "Circuit"], correct: 1 },
        { q: "What is the literal translation of 'Bhindi' in English?", options: ["Gentleman's finger", "Lady's finger", "Green stick", "Potato's cousin"], correct: 1 },
        { q: "What happens if you accidentally bite an Elaichi in Biryani?", options: ["Enhanced flavor", "Immediate emotional damage", "Chef gets a bonus", "Nothing"], correct: 1 },
        { q: "Who is the absolute true ruler of Indian highway traffic?", options: ["Heavy trucks", "Luxury SUVs", "The Street Cow", "E-rickshaws"], correct: 2 }
    ],
    hindi: [
        { q: "शादी के खाने में ऐसा क्या होना चाहिए जिससे फूफा जी और जीजा जी उसे पास करें?", options: ["गरम गुलाब जामुन", "कढ़ाई पनीर", "निराशा (Disappointment)", "ऊपर के सभी विकल्प"], correct: 3 },
        { q: "इस अमर डायलॉग को पूरा करें: 'रिश्ते में तो हम तुम्हारे ________ लगते हैं।'", options: ["दूर के मामा", "शहंशाह वाले बाप", "गुस्सैल फूफा", "अमीर ससुर"], correct: 1 },
        { q: "जब आप कहते हैं कि आप बहुत तनाव में हैं, तो भारतीय मां का सबसे पहला ब्रह्मास्त्र क्या होता है?", options: ["बेटा थोड़ा आराम कर लो", "एक गिलास ठंडा पानी पी लो", "तुम दिन भर फोन चलाओ बस!", "चलो अच्छे डॉक्टर के पास चलते हैं"], correct: 2 },
        { q: "यदि अंपायर धोनी को आउट दे दे, और धोनी मुस्कुराते हुए DRS ले लें, तो क्या होता है?", options: ["अंपायर का ही रिव्यू शुरू हो जाता है", "धोनी चुपचाप पवेलियन लौट जाते हैं", "तीसरा अंपायर पसीने-पसीने होकर घबरा जाता है", "मैच को वहीं रद्द घोषित कर दिया जाता है"], correct: 0 },
        { q: "एक खतरनाक स्पीड ब्रेकर देखने के बाद भी भारतीय ऑटोवाले की डिफ़ॉल्ट स्पीड क्या होती है?", options: ["0 किमी/घंटा", "ऑટો સીધે હવામાં ઉડે", "फार्मूला 1 स्पीड", "B और C दोनों"], correct: 3 },
        { q: "दिवाली पर मिलने वाले सोन पापड़ी के डिब्बे का असली और शाश्वत उपयोग क्या है?", options: ["मम्मी द्वारा सिलाई का सामान रखना", "किसी दूसरे रिश्तेदार को आगे बढ़ा देना", "कूड़ेदान बनाना", "वह ब्रह्मांड से तुरंत गायब हो जाता है"], correct: 1 },
        { q: "किस महान इंजीनियर ने पूरे देश को जीवन बदलने वाला मंत्र दिया था: 'Aal Izz Well'?", options: ["कबीर सिंह", "रेंचो (3 Idiots)", "बाबूराव आप्टे", "सर्किट भाई"], correct: 1 },
        { q: "अंग्रेजी डिक्शनरी में हमारी 'भिंडी' का आधिकारिक और सम्मानित अनुवाद क्या है?", options: ["Gentleman's finger", "Lady's finger", "Green stick", "Potato's green cousin"], correct: 1 },
        { q: "अगर शाही बिरयानी का पूरा स्वाद लेते समय अचानक मुंह में इलायची आ जाए तो क्या होता है?", options: ["खाने का जायका बढ़ जाता है", "तत्काल गंभीर मानसिक क्षति", "बावर्ची को नकद इनाम मिलता है", "कुछ फर्क नहीं पड़ता"], correct: 1 },
        { q: "मीम्स के अनुसार, भारतीय सड़कों का असली और सर्वेसर्वा शासक कौन है?", options: ["भारी ट्रक", "लक्ज़री SUVs", "सड़क के बीचों-बीच बैठी गाय", "ई-रिक्शा"], correct: 2 }
    ],
    marathi: [
        { q: "लग्नाच्या पंगतीत नातेवाईकांनी जेवण 'उत्कृष्ट' म्हणण्यासाठी मेनूमध्ये नक्की काय असावे लागते?", options: ["गरमागरम गुलाब जामुन", "मसालेदार पनीर", "नापसंती आणि रुसवा (Disappointment)", "वरील सर्व पर्याय बरोबर"], correct: 3 },
        { q: "हा अजरामर डायलॉग पूर्ण करा: 'रिश्ते mein toh hum tumhare ________ lagte hain.'", options: ["गावचे मामा", "ख्वाबों वाले बाप", "रुसलेले फुफा", "लाडके ससुर"], correct: 1 },
        { q: "तुम्ही टेन्शन मध्ये आहात असे सांगितल्यावर आपल्या मराठी आईचे अचूक उत्तर काय असते?", options: ["बाळा थोडा आराम कर", "आधी पाणी पी", "तुम दिन भर phone चलाओ बस!", "चल आपण डॉक्टरकडे जाऊया"], correct: 2 },
        { q: "जर अंपायरने एमएस धोनीला आउट दिले, आणि धोनीने लगेच DRS घेतला, तर काय होते?", options: ["अंपायरचाच रिव्ह्यू सुरू होतो", "धोनी गुपचूप पॅव्हेलियनमध्ये जातो", "तिसरा अंपायर टेन्शनमध्ये येतो", "तो सामना तिथेच रद्द केला जातो"], correct: 0 },
        { q: "गतिरोधक (Speed Breaker) दिसल्यावर आपल्या ऑटोवाल्याचा वेग काय असतो?", options: ["० किमी/तास", "ऑटो हवेत रॉकेटसारखा उडतो", "फॉर्म्युला १ पेक्षा जास्त वेग", "B आणि C दोन्ही पर्याय एकत्र"], correct: 3 },
        { q: "दिवाळीत आलेल्या सोनपापडीच्या रिकाम्या बॉक्सचा वापर आपल्या घरात शेवटी कशासाठी होतो?", options: ["सुया आणि धागे सुरक्षित ठेवणे", "दुसऱ्या नातेवाईकाला गिफ्ट देणे", "कचरा टाकण्यासाठी", "तो बॉक्स गूढपणे गायब होतो"], correct: 1 },
        { q: "थ्री इडियट्स सिनेमात 'ऑल इझ वेश' हा मंत्र कोणी दिला होता?", options: ["कबीर सिंग", "रणछोड़दास चांचड (रेंचो)", "बाबूराव आप्टे", "सर्किट भाई"], correct: 1 },
        { q: "इंग्रजी भाषेत आपल्या 'भेंडी'ला अत्यंत आदराने काय म्हणतात?", options: ["Gentleman's finger", "Lady's finger", "Green stick", "બટાટાનો ભાઈ"], correct: 1 },
        { q: "बिर्याणी खाताना अचानक तोंडात विलायची आली तर काय होते?", options: ["चव अधिकच अप्रतिम होते", "तीव्र भावनिक धक्का बसतो", "शेफला लगेच शाबासकी दिली जाते", "काहीच फरक पडत नाही"], correct: 1 },
        { q: "इतिहासानुसार, आपल्या रस्त्यांवरचा खरा राजा कोण आहे?", options: ["मोठे अवजડ ट्रक्स", "काळ्या काचांच्या SUVs", "रस्त्याच्या मधोमध बसलेली गाय", "ई-रिक्षा"], correct: 2 }
    ],
    gujarati: [
        { q: "લગ્નના જમણમાં સગા-સંબંધીઓ જમણના વખાણ કરે એ માટે મેનૂમાં શું હોવું ફરજિયાત છે?", options: ["ગરમાગરમ ગુલાબ જાંબુ", "કાજુ પનીરનું શાક", "અસંતોષ (Disappointment)", "આપેલ તમામ વિકલ્પો સાચા"], correct: 3 },
        { q: "આ ડાયલોગ પૂરો કરો: 'Rishte mein toh hum tumhare ________ lagte hain.'", options: ["મામા", "શાહરૂખવાળા બાપ", "ફુફા", "સસરા"], correct: 1 },
        { q: "જ્યારે તમે મમ્મીને કહો કે 'બહુ સ્ટ્રેસ છે', ત્યારે મમ્મીનો જવાબ શું હોય?", options: ["આરામ કરી લે થોડો", "પહેલા પાણી પી", "Tum din bhar phone chalao bas!", "ચલો સારા ડોક્ટર પાસે જઈએ"], correct: 2 },
        { q: "જો અમ્પાયર ધોનીને આઉટ આપે અને ધોની સ્માઈલ સાથે DRS લે, તો શું થાય?", options: ["અમ્પાયરનો જ રિવ્યૂ શરૂ થઈ જાય", "ધોની પેવેલિયન તરફ રવાના થાય", "થર્ડ અમ્પાયર ગભરાઈ જાય", "મેચને ત્યાં જ કેન્સલ જાહેર કરાય"], correct: 0 },
        { q: "સ્પીડ બ્રેકર જોઈને ઓટોવાળા ભાઈની સ્પીડ શું થઈ જાય?", options: ["0 કિમી/કલાક", "ઓટો સીધો હવામાં ઉડે", "ફોર્મ્યુલા 1 સ્પીડ", "B અને C બંને સ્પીડ"], correct: 3 },
        { q: "સોન પાપડીના ખાલી બોક્સનો સાચો બીજો ઉપયોગ શું છે?", options: ["મમ્મી દ્વારા સોય-દોરો રાખવા", "બીજા કોઈ સગાને પધરાવી દેવું", "કચરાપેટી બનાવવી", "એ બોક્સ જાદુઈ રીતે ગાયબ થઈ જાય"], correct: 1 },
        { q: "કયા મહાન કેરેક્ટરે એન્જિનિયરિંગ કોલેજનો અમર મંત્ર આપ્યો હતો: 'Aal Izz Well'?", options: ["કબીર સિંહ", "રેંચો (3 Idiots)", "બાબુરાવ આપ્ટે", "સર્કિટ ભાઈ"], correct: 1 },
        { q: "અંગ્રેજી ડિક્શનરીમાં આપણા 'ભીંડા' નું સત્તાવાર નામ શું છે?", options: ["Gentleman's finger", "Lady's finger", "Green stick", "બટાકાનો ભાઈ"], correct: 1 },
        { q: "મસ્ત મસાલેદાર બિરયાની ખાતી વખતે અચાનક મોઢામાં ઇલાયચી આવી જાય તો...?", options: ["સ્વાદ ડબલ થઈ જાય", "તરત જ તીવ્ર માનસિક આઘાત", "રસોઈયાને મોટું ઈનામ અપાય", "કંઈ જ ફરક ન પડે"], correct: 1 },
        { q: "ભારતના રસ્તાઓનો અસલી રાજા કોણ છે?", options: ["ભારે ઓવરલોડેડ ટ્રક", "કાચ કાળા હોય એવી SUVs", "રસ્તા વચ્ચે બેઠેલી ગાય માતા", "ઈ-રિક્ષા"], correct: 2 }
    ]
};

app.get('/api/game-setup', (req, res) => {
    try {
        const lang = req.query.lang || 'english';
        const selectedLanguageDeck = questions[lang] || questions['english'];
        
        // Clone and Shuffle Deck safely
        const shuffledQuestions = [...selectedLanguageDeck].sort(() => Math.random() - 0.5).slice(0, 10);
        
        const correctMemeFolder = path.join(__dirname, 'public', 'images', 'correct');
        const wrongMemeFolder = path.join(__dirname, 'public', 'images', 'wrong');
        
        let correctMemes = [];
        let wrongMemes = [];

        // Fail-safe folder readers to prevent server crash if directories are missing files
        if (fs.existsSync(correctMemeFolder)) {
            correctMemes = fs.readdirSync(correctMemeFolder).map(file => `/images/correct/${file}`);
        }
        if (fs.existsSync(wrongMemeFolder)) {
            wrongMemes = fs.readdirSync(wrongMemeFolder).map(file => `/images/wrong/${file}`);
        }

        res.json({
            questions: shuffledQuestions,
            correctMemePool: correctMemes.length > 0 ? correctMemes.sort(() => Math.random() - 0.5) : ["/images/default-correct.png"],
            wrongMemePool: wrongMemes.length > 0 ? wrongMemes.sort(() => Math.random() - 0.5) : ["/images/default-wrong.png"]
        });
    } catch (err) {
        console.error("Runtime Exception:", err);
        res.status(500).json({ error: "Internal Server Process Error" });
    }
});

app.listen(PORT, () => console.log(`Memepati Server running smoothly at http://localhost:${PORT}`));