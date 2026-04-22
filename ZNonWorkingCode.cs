<div>
        <div class="popup" id="vSongContainer">
          <div class="popup-content scrollable-content">
            <h2>Vaishnav Song</h2>
            <button
              class="red"
              style="margin-bottom: 10px"
              onclick="SHOW_SPECIFIC_DIV('mainContainer')"
            >
              Back
            </button>
            <div class="liveSearchContainer" style="margin-bottom: 10px">
              <input
                type="text"
                id="vSongListInput"
                class="liveSearch"
                placeholder="Select Vaishnav Song..."
              />
              <ul id="vSongULList" class="liveSearchUL"></ul>
            </div>
            <div class="video-container" id="vSongVideoContainer">
              <iframe
                id="vSongIFrame"
                loading="lazy"
                src=""
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
            <div id="vSongCardView" class="card-view"></div>
          </div>
        </div>
      </div> 


      --------------------

      let videoStaticPart = "https://www.youtube.com/embed/";
const videoPlayer = document.getElementById("vSongIFrame");
let selectedItem = "";
const videoOptions = [
  {
    label: "Ohe Vaishnava Thakur",
    value: "lpw1-tKDhYk",
    lyrics: `(1)
ओह!
वैष्णव ठाकुर, दोयारा सागर,
ई दसे कोरुना कोरी'
दिया पद-छाया, सोधो हे अमाया,
तोमारा कैराना धोरी

(2)
छाया बेगा डोमी', छाया दोष सोढ़ी',
छाया गुण देहो' दसे
छाया सत-संगा, देहो' हे अमारे ,
बोशेची संगेरा ऐसे

(3)
एकाकी अमारा, नहीं पाया बाला,
हरि-नाम-संकीर्तने
तुमि कृपा कोरी', श्रद्धा-बिंदु दीया,
देहो' कृष्ण-नाम-धने

(4)
कृष्ण से तोमारा, कृष्ण दिते पारो,
तोमारा सकाति अचे
अमी तो' कंगाला, 'कृष्ण' 'कृष्ण' बोली',
धाय तवा पाछे पाछे`,
  },
  {
    label: "Kabe Habe Bolo",
    value: "vLslU9_NoRY",
    lyrics: `(1)
काबे हा'बे बोलो से-दीना अमर
(अमर) अपराधा घुसी', शुद्ध नाम रुचि,
कृपा-बाले हाबे हृदयोये संसार

(2)
त्रिनाधिका हिना, काबे निजे मणि' ,
सहिष्णुता-गुण हृदयोयते अणि
सकले मनदा, अपनि अमानी,
होए अस्वादिबो नाम-रस-सार

(3)
धन जन अरा, कोबिता-सुंदरी,
बोलिबो न चाही देहो-सुखा-कारी
जन्म-जन्मे दाओ, ओहे गौरहरि!
अहैतुकि भक्ति करणे तोमर

(4)
(काबे) कोरिते श्रीकृष्ण-नाम उचारणा,
पुलकिता देहो गदगदा बाकाना
बैबरन्या-बेपथु हा'बे संगठन,
निरंतर नेत्रे बा'बे असरु-धर

(5)
काबे नवद्वीपे, सुरधुनी-ताते,
गौरा- नित्यानंद बोली 'निष्कपते
नचिया गैया, बेराइबो छूटे,
बतुलेरा प्रया चारिया बिकार

(6)
काबे नित्यानंद, मोरे कोरी 'दोया,
चरइबे मोरा विशयेरा माया
दिया मोरे निज-कारनेरा छाया,
नमेरा हतेते दिबे अधिकार

(7)
किनिबो, लुटिबो, हरि-नाम-रसा,
नाम-रसे मति' होइबो बिबासा
रसेरा रसिका-कारना परसा,
कोरिया मोजिबो रसे अनीबार

(8)
काबे जाइबे दोया, होइबे उदोया,
निज-सुखा भूली' सुदिना-हृदयोया
भक्तिविनोद, कोरिया बिनोया,
श्री-अजना-तहाला कोरिबे प्राकार`,
  },
  {
    label: "Amar Jivan",
    value: "v1Vuxk49r8E",
    lyrics: `(1)
अमर जीवन, सदा पापे रता,
नहिको पुण्येरा लेषा
परेरे उद्वेगा, दीयाची जे कोतो,
दीयाची जीवरे क्लेसा

(2)
निज सुख लागी, 
पापे नहीं डोरी, 
दोया-हिना स्वार्थ-परो
पर-सुख दुःखी, 
सदा मिथ्या-भासी, 
पर-दुःख सुख-करो

(3)
अशेष कामना, हृदि माझे मोरा,
क्रोधी, दंभ-परायण
मद-मत्त सदा, विषये मोहिता,
हिंसा-गर्व विभूषण

(4)
निद्रालस्य हता, सुकार्ये विराट,
अकार्ये उद्योगी अमि
प्रतिष्ठा लागिया, शठ्य-आचरण,
लोभ-हता सदा कामी

(5)
ई हेनो दुर्जन, सज-जन-वर्जिता,
अपराधि निरंतर
शुभ-कार्य-शून्य, सदनार्थ-मनाः, 
नाना दुखे जरा जरा

(6)
बर्धक्ये एखोना, उपाय-विहिना,
ताते दिन अकिंचन
भक्तिविनोद, प्रभु चरणे,
कोरे दु:ख निवेदन`,
  },
  {
    label: "Radhe jaya jaya madhava dayite",
    value: "ASf8xZU2rqc",
    lyrics: `राधे जया जय माधव-दयिते गोकुल-तरुणि-मंडला-महिते

(1)
दामोदर-रति-वर्धन-वेसे
हरि-निष्कुट-वृंदा-विपिनीस

(2)
वृषभानुदधि-नव-ससि-लेखे
ललिता-सखी गुण-रमिता-विशाखे

(3)
करुणाम कुरु मयि करुणा-भारिते
सनक-सनातन-वर्नैता-चरिते`,
  },
  {
    label: "Sri Sadgoswami Astakam",
    value: "kGhPqjFKfA8",
    lyrics: `श्री श्री षड-गोस्वामी-अष्टक श्रीनिवास आचार्य द्वारा

(1)
कृष्णोत्कीर्तन-गण-नर्तन-परौ प्रेममृतंभो-निधि
धीराधिरा-जन-प्रियौ प्रिया-करौ निर्मित्सरौ पूजितौ
श्री-चैतन्य-कृपा-भरौ भुवि भुवो भरवाहन्तरकौ
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(2)
नाना-शास्त्र-विचारणिका-निपुणौ सद्-धर्म-संस्थापकौ
लोकानं हित-करिणौ त्रि-भुवने मन्यौ सरण्यकरौ
राधा-कृष्ण-पदारविन्द-भजनानन्देन मत्तलिकौ
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(3)
श्री-गौरांग-गुणानुवर्णन- विधौ श्रद्धा-समृद्धि-अन्वितौ
पापोत्प-निकृन्तनौ तनु-भृतम् गोविंद-गणमृतैः
आनंदंबुद्धि-वर्धनिका-निपुणौ कैवल्य-निस्तरकौ
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(4)
त्यक्त्वा तुर्णं अशेष-मंडला-पति-श्रेणिम सदा तुच्च-वत
भूत्वा दिन-गणेशकौ करुणय कौपीन-कण्ठाश्रितौ
गोपी-भव -रसामृताबधि-लहरी-कल्लोला-मगनौ मुहुर
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(5)
कुजात-कोकिला-हंस-सरस-गणाकिर्ने मयूरकुले
नाना-रत्न-निबद्ध-मूल-विटप-श्री-युक्त-वृंदावने
राधा-कृष्णम आहार-निसम प्रजातौ जीवार्थदौ यौ मुदा वन्दे
रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(6)
सांख्य-पूर्वक-नाम-गण-नतिभिः कालवासनि-कृतौ
निद्राहार-विहारकादि-विजितौ कात्यंता-दिनौ च यौ
राधा-कृष्ण-गुण-स्मृति मधुरिमंडेन सम्मोहितौ
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(7)
राधा-कुंड-तते कलिंद-तनय-तिरे च वामसिवते
प्रेमोनमदा -वसद अशेष-दासया ग्रस्तौ प्रमत्तौ सदा
गायनतौ च कदा हरेर गुण-वरं भवभिभूतौ मुदा
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ

(8)
हे राधे व्रज-देविके च ललिते हे नंद-सुनो कुतः
श्री-गोवर्धन-कल्प-पादप-तले कालिन्दी-वने कुतः
घोषान्तव इति सर्वतो व्रज-शुद्ध खेदैर महा-विह्वलौ
वन्दे रूप-सनातनौ रघु-युगौ श्री-जीव-गोपालकौ`,
  },
];

function openVSongWindow() {
  SHOW_SPECIFIC_DIV("vSongContainer");
}

document.addEventListener("DOMContentLoaded", function () {
  setupLiveSearch("vSongListInput", "vSongULList", function (selectedText) {
    selectedItem = videoOptions.find((option) => option.label === selectedText);
    if (selectedItem) {
      videoPlayer.src = `${videoStaticPart}${selectedItem?.value}`;
      renderVSongCardView([selectedItem.lyrics]);
    }
  });

  initializedVSongList();
});

function initializedVSongList() {
  const list = videoOptions
    .map((item) => item.label)
    .sort((a, b) => a.localeCompare(b));
  initializedLiveSearchControl("vSongListInput", "vSongULList", list);
}

function renderVSongCardView(data) {
  
  const container = document.getElementById("vSongCardView");
  container.innerHTML = "";
  data.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("card-view-item");

    // Split lyrics by line breaks and add each line to the div
    const lines = item.split("\n");
    lines.forEach((line) => {
      const lineDiv = document.createElement("div");
      lineDiv.textContent = line; // Use textContent to avoid HTML rendering issues
      itemDiv.appendChild(lineDiv);
    });

    container.appendChild(itemDiv);
  });
}
