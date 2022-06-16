//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeContent =
  "Welcome to TECH-DAILY. We are an open-source platform for science and technology. We provide the latest topics in these industries for all professionals. Here, you can find deep discussions and answers to recent science and technological advancements. From space, robotics, developing and military, we have it all. We take pride in being the first to cover new science and technological achievements for all.";
const aboutContent =
  "Designing, building, updating state-of-the-art easy to use websites is a passion of ours. With this, we are able to be confident to be a excellent addition to your business. Adding to our knowledge base, we always seek out and research new technologies and stay up to date on industry advancements. This keeps ous ahead of the game and helps us deliver professional work with innovative solutions to all.";

const contactContent = "";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://node:Mongo@cluster0.u1synjm.mongodb.net/blogDB"
);

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

const posts = [
  {
    name: "Ben Pope",
    title: "Mathematician Scientist",
    content:
      "The current job market requires scientifically literate human resources. At a time in which scientific reasoning should be part of the higher education curriculum, the general population is pulling away from it. This review aims to identify how students’ and teachers’ attitudes and values influence academic performance in science courses. PICO and the Preferred Reporting Items for Systematic Reviews and Meta-Analyses (PRISMA) approaches were used to explore four databases and 6488 articles were retrieved. Articles had to be relevant to the research question and published within the last 10 years. Articles without an identifiable author or articles unrelated to the research question were excluded. Following three rounds of quality screening, 10 articles were finally selected for analysis. Study designs and quality varied across the selected articles. Self-efficacy, having mastery goals, perceiving the course as valuable, and having a student identity were consistently associated with good learning outcomes. Cooperation was found to increase task value and autonomy when taking science courses; conversely, a performance approach and a consumer identity were negatively correlated with good learning outcomes. In the past 10 years, there was paucity in research studying the role of teacher attitudes towards science courses on learning outcomes. This article proposes a hypothetical model that describes how attitudes and values may lead to mastery and a good academic performance in undergraduate science courses. With this model, we seek to enhance and strengthen the nature and scope of science education in universities.",
  },
  {
    name: "Marisa Mahoney",
    title: "Machine Learning Engineer",
    content:
      "Machine learning plays a critical role in extracting meaningful information out of the zetabytes of sensor data collected every day. For some applications, the goal is to analyze and understand the data to identify trends (e.g., surveillance, portable/wearable electronics); in other applications, the goal is to take immediate action based the data (e.g., robotics/drones, self-driving cars, smart Internet of Things). For many of these applications, local embedded processing near the sensor is preferred over the cloud due to privacy or latency concerns, or limitations in the communication bandwidth. However, at the sensor there are often stringent constraints on energy consumption and cost in addition to throughput and accuracy requirements. Furthermore, flexibility is often required such that the processing can be adapted for different applications or environments (e.g., update the weights and model in the classifier). In many applications, machine learning often involves transforming the input data into a higher dimensional space, which, along with programmable weights, increases data movement and consequently energy consumption. In this paper, we will discuss how these challenges can be addressed at various levels of hardware design ranging from architecture, hardware-friendly algorithms, mixed-signal circuits, and advanced technologies (including memories and sensors).",
  },
  {
    name: "zabella Schroeder",
    title: "Software Engineering Manager",
    content:
      "The rapid proliferation and ubiquity of mobile, smart devices in the consumer market has forced the software engineering community to quickly adapt development approaches conscious of the novel capabilities of mobile applications. The combination of computing power, access to novel onboard sensors and ease of application transfer to market has made mobile devices the new computing platform for businesses and independent developers. However, the growth of this new computing platform has outpaced the software engineering work tailored to mobile application development. This position paper looks at four significant challenges to mobile application software engineering and provides a discussion of possible research directions, drawing from existing areas of software engineering, that should be further examined. Specifically, we examine the challenge of: 1) creating user interfaces accessible to differentlyabled users; 2) handling the complexity of providing applications across multiple mobile platforms; 3) designing context-aware aware applications; and, 4)specifying requirements uncertainty.",
  },
  {
    name: "Marlie Evans",
    title: "Physicists",
    content:
      "The inclusion of the history and philosophy of science (HPS) in science teaching is widely accepted, but the actual state of implementation in schools is still poor. This article investigates possible reasons for this discrepancy. The demands science teachers associate with HPS-based teaching play an important role, since these determine teachers’ decisions towards implementing its practices and ideas. We therefore investigate the perceptions of 8 HPS-experienced German middle school physics teachers within and beyond an HPS implementation project. Within focused interviews these teachers describe and evaluate the challenges of planning and conducting HPS-based physics lessons using collaboratively developed HPS teaching materials. The teachers highlight a number of obstacles to the implementation of HPS specific to this approach: finding and adapting HPS teaching material, knowing and using instructional design principles for HPS lessons, presenting history in a motivating way, dealing with students’ problematic ideas about the history of science, conducting open-ended historical classroom investigations in the light of known historical outcomes, using historical investigations to teach modern science concepts, designing assessments to target HPS-specific learning outcomes, and justifying the HPS-approach against curriculum and colleagues. Teachers' perceived demands point out critical aspects of pedagogical content knowledge necessary for confident, comfortable and effective teaching of HPS-based science. They also indicate how HPS teacher education and the design of curricular materials can be improved to make implementing HPS into everyday teaching less demanding.",
  },
  {
    name: "Carlo Weeks",
    title: "Computer Engineer",
    content:
      "The collaborative and low-cost nature of wireless sensor networks (WSNs) brings significant advantages over traditional communication technologies used in today's electric power systems. Recently, WSNs have been widely recognized as a promising technology that can enhance various aspects of today's electric power systems, including generation, delivery, and utilization, making them a vital component of the next-generation electric power system, the smart grid. However, harsh and complex electric-power-system environments pose great challenges in the reliability of WSN communications in smart-grid applications. This paper starts with an overview of the application of WSNs for electric power systems along with their opportunities and challenges and opens up future work in many unexploited research areas in diverse smart-grid applications. Then, it presents a comprehensive experimental study on the statistical characterization of the wireless channel in different electric-power-system environments, including a 500-kV substation, an industrial power control room, and an underground network transformer vault. Field tests have been performed on IEEE 802.15.4-compliant wireless sensor nodes in real-world power delivery and distribution systems to measure background noise, channel characteristics, and attenuation in the 2.4-GHz frequency band. Overall, the empirical measurements and experimental results provide valuable insights about IEEE 802.15.4-compliant sensor network platforms and guide design decisions and tradeoffs for WSN-based smart-grid applications.",
  },
  {
    name: "Keyla Small",
    title: "Mechanical Engineer",
    content:
      "To meet the challenges of the future, we must address four urgent issues: First, build a flexible workforce. The future mechanical engineers must be able to adapt and change in order to produce globally competitive engineers that will contribute to the growing needs of our profession over the next two decades. We need to harmonize the professional requirements and educational levels that vary so greatly around the world. An understanding of educational challenges and the need for key curriculum reform in complex systems and multidisciplinary coordination are important. Second, develop sustainability through new technologies and techniques, to be responsive to the global environmental pressures brought by economic growth. To be truly innovative in solutions, especially in areas such as water management, energy, manufacturing, healthcare and agriculture, will require new business models and new design approaches. Third, adopt systems thinking, which enables engineers to look at design differently, with broader parameters for social and environmental priorities. This means engineers adopt a greater understanding of multiple cause-effect relationships. Greater technology knowledge must be matched by more depth in management and problem-solving capacity, as well as the ability to coordinate across greater distances and timeframes. Fourth, infuse innovation in our business models and designer's mind as key to staying competitive in global markets. Creative skills are perhaps the key competitive advantage for engineers. ASME is focusing on these major patterns, evident today, that will help the profession understand what can be expected in the future, just 20 years from now. Many of these trends show incremental changes, rather than revolutionary breakthroughs. For many industries, the race for economically feasible and environmentally neutral solutions is swift and full on. For educators, the next generation is seated before them with high expectations of making a difference in the world. For all engineers, of any discipline or specialty, the need for innovation networks and collaborative approaches is a shared vision. As a convener of innovation networks, ASME helps engineers make connections, offers a world view of opportunities and speeds progress of initiatives in many key areas. We are all part of leadership that fosters an engineering culture that is innovative and responsive.",
  },
  {
    name: "Eric Pollard",
    title: "Electronics Engineer",
    content:
      "Nowadays, there is an extensive variety of tools to provide theoretical contents and activities for any learning methodology derived from distance education: videos, e-documents, tutorials, peer-to-peer reviews, forums, etc. These tools, by an efficient and appropriate selection from teachers and use from students, can complement or replace successfully in-person education, even they can reach some aspects that in-person education cannot achieve. Unfortunately, practical aspects are not as developed as theoretical ones are despite distance education is being promoted from many sectors. Traditionally, simulators have been the first option to provide an experimental environment. However, simulators are far from provide real-life operation conditions or the disadvantages that real systems have. The experimentation allows students the interaction with real components, equipment and instruments, the verification of the theoretical laws governing the behavior of electric and electronic circuits or the analysis of non-desired effects. Unfortunately, laboratory resources are limited because of their availability, costs, requirement of specialized personnel during practical sessions, etc. This restraint induces in students a trend to address practical experiences separately from theoretical contents, as if they were two activities non-related to each other. The emergence of remote laboratories has provided new horizons in the learning process and has brought new challenges in teaching design. Remote laboratories are being used in many ways and obeying different learning strategies. In this paper, we will analyze how VISIR (Virtual Instruments System In Reality) remote laboratory has been applied in different learning environments and its influence over the learning processes at Spanish University for Distance Education (UNED).",
  },
  {
    name: "Tim Strong",
    title: "Mathematician Scientist",
    content:
      "Today's challenges faced by science and engineering are so complex that they can only be solved through the help and participation of mathematical scientists. All three approaches to science, observation and experiment, theory, and modeling are needed to understand the complex phenomena investigated today by scientists and engineers, and each approach requires the mathematical sciences. Currently observationalists are producing enormous data sets that can only be mined and patterns discerned by the use of deep statistical and visualization tools. Indeed, there is a need to fashion new tools and, at least initially, they will need to be fashioned specifically for the data involved. Such will require the scientists, engineers, and mathematical scientists to work closely together. Scientific theory is always expressed in mathematical language. Modeling is done via the mathematical formulation using computational algorithms with the observations providing initial data for the model and serving as a check on the accuracy of the model. Modeling is used to predict behavior and in doing so validate the theory or raise new questions as to the reasonableness of the theory and often suggests the need of sharper experiments and more focused observations. Thus, observation and experiment, theory, and modeling reinforce each other and together lead to our understanding of scientific phenomena. As with data mining, the other approaches are only successful if there is close collaboration between mathematical scientists and the other disciplinarians.",
  },
];

app.get("/", function (req, res) {
  Post.find({}, function (err, posts) {
    res.render("home", { StartingContent: homeContent, posts: posts });
  });
});

app.get("/all", function (req, res) {
  res.render("all", {
    posts: posts,
  });
});

app.get("/about", function (req, res) {
  res.render("about", { AboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.post("/contact", function (req, res) {
  const post = {
    name: req.body.postName,
    message: req.body.postMessage,
  };

  if (post.name === "" || post.message === "") {
    console.log("Fill all fields.");
  } else {
    res.redirect("/");
  }
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = new Post({
    name: req.body.postName,
    title: req.body.postTitle,
    content: req.body.postBody,
  });

  if (post.name === "" || post.title === "" || post.content === "") {
    console.error("Fill all fields.");
  } else {
    posts.push(post);
    post.save(function (err) {
      if (!err) {
        res.redirect("/all");
      }
    });
    // res.redirect("/all");
  }
});

app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {
    res.render("post", {
      name: post.name,
      title: post.title,
      content: post.content,
    });
  });
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server started");
});
