"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Linkedin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SpeakerProps {
  name: string;
  title: string;
  image: string;
  bio: string;
  linkedin:string;
}

function Speaker({ name, title, image, bio, linkedin }: SpeakerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent background scrolling when dialog is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore background scrolling when dialog is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scrolling if component unmounts while dialog is open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div
          initial="rest"
          whileHover="hover"
          whileTap="tap"
          variants={{
            rest: {
              scale: 1,
              y: 0,
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
            },
            hover: {
              scale: 1.02,
              y: -2,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
            },
            tap: {
              scale: 0.98,
            },
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="flex py-3 sm:py-4 px-3 sm:px-4 items-center rounded-3xl border border-gray-200 bg-white cursor-pointer group"
        >
          <motion.div
            className="relative overflow-hidden rounded-full mr-3 sm:mr-4 flex-shrink-0"
            variants={{
              rest: {
                scale: 1,
                rotate: 0,
              },
              hover: {
                scale: 1.1,
                rotate: 5,
              },
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src={image}
              alt={name}
              width={50}
              height={50}
              className="rounded-full transition-transform duration-300 group-hover:brightness-110 sm:w-[60px] sm:h-[60px]"
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold group-hover:text-[#0E5344] transition-colors duration-200 text-sm sm:text-base truncate">
              {name}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
              {title}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="text-[#0E5344] flex-shrink-0"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="sm:w-4 sm:h-4"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="p-0 w-[95vw] max-w-[95vw] sm:max-w-md md:max-w-lg max-h-[90vh] bg-white border-none rounded-lg overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">{name}</DialogTitle>
        <DialogDescription className="sr-only">{bio}</DialogDescription>

        {/* Image Section with Skeleton */}
        <div className="relative flex-shrink-0 aspect-square">
          {!imageLoaded && <Skeleton className="w-full h-full rounded-none" />}
          <Image
            src={image}
            alt={name}
            width={800}
            height={800}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            priority
          />
          {imageLoaded && (
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/80 to-transparent" />
          )}
        </div>

        {/* Content Section with Skeleton */}
        <div className="p-4 sm:p-6 -mt-24 sm:-mt-32 relative z-10 overflow-y-auto flex-1">
          {!imageLoaded ? (
            // Skeleton Content
            <div className="bg-white rounded-t-lg p-4 sm:p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ) : (
            // Actual Content
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold leading-tight">
                    {name}
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base">
                    {title}
                  </p>
                </div>
                <Button
                  className="flex items-center rounded-full px-3 sm:px-4 py-1 gap-2 text-xs sm:text-sm w-fit"
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </Button>
              </div>
              <div className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-3">
                  {bio.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const speakers = [
  {
    name: "Hon. (Eng.) Eranga Weeraratne, M.P.",
    title: "Hon. Deputy Minister of Digital Economy",
    image: "/images/corporateEvent/1-eranga_weeraratne.png",
    bio: "Hon. (Eng.) Eranga Weeraratne is a distinguished leader in Sri Lanka’s digital transformation, currently serving as the Deputy Minister of Digital Economy. With extensive experience in digital governance, telecommunications, and ICT policy development, he has been instrumental in modernizing Sri Lanka’s digital infrastructure and driving technological advancement.\n\nBefore entering public service, Eranga held key leadership roles as Chief Executive Officer (CEO) and Chief Technology Officer (CTO), where he spearheaded innovation and strategic growth in the digital technology and services sector. His expertise is backed by a B.Sc in Computer Science & Engineering from the University of Moratuwa, equipping him with a strong foundation in technology and policy-making. As the Hon. Deputy Minister of Digital Economy, Eranga remains dedicated to positioning Sri Lanka as a regional hub for technological innovation, fostering a thriving digital economy through strategic policies, infrastructure development, and digital empowerment initiatives.",
    linkedin:"https://www.linkedin.com/in/eranga-weeraratne-0b52454/",
  },
  {
    name: "Dr. Mothilal de Silva",
    title: "Chairman/Director of SLTMobitel",
    image: "/images/corporateEvent/2-mothilal_de_silva.png",
    bio:"Chairman/Director of eChannelling PLC, Mobitel (Pvt) Ltd., Sri Lanka Telecom (Services) Ltd., SLT Human Capital Solutions (Pvt) Ltd., Galle Submarine Cable Depot (Pvt) Ltd., and Mobit Technologies (Pvt) Ltd. Member of the Technology Subcommittee, Group Senior Tender Board, Nominations and Governance Committee. \n\nWith a career spanning over many decades, Dr Mothilal de Silva is a results oriented multidisciplinary C-level executive in the telecommunication industry having experience in Sri Lanka and multiple countries in Asia and Pacific regions. He is a turnaround specialist and a strategist. Under his leadership as Group Chief Executive Officer, he turned around the Fiji′s state-owned telecommunication company Telecom Fiji Ltd. sustainably after 5+ consecutive loss-making years. During his tenure at Telecom Fiji, the Company registered consistent growth in profit, dividend and investment for network modernisation. He was also the Group Chief Strategy Officer and Group Chief Corporate Officer of Dialog Axiata, General Manager (Sales, Marketing and Customer Service) of MTN Networks Pvt Ltd and Vice President Process Excellence and Group Operations of Axiata Group Malaysia. He sat on the Board of Directors of Lanka Communication Services Pvt Ltd., a telecommunication service provider for enterprises in Sri Lanka.\n\nAs a C-level executive at Dialog, Dr Mothilal set up Corporate Planning, Strategy, MIS, Business Intelligence, Performance Management, Quality, Process Reengineering, Enterprise Programme Management and Corporate Development divisions from scratch while apprenticing young set of managers who had progressed to become leaders in Dialog and Axiata Group subsidiary companies. He was also instrumental in winning GSMA Awards, International Asia Pacific Quality Award, Asia CSR Award for Dialog Axiata and many national awards.\n\nDr Mothilal had delivered over 60 presentations in various international forums as a speaker, panelist, session Chairman, and Workshop leader mainly on the Next Generation Networks, Corporate Venture Capital for Telco, Platform Economy, Business Intelligence, Sustainability and Business Integral CSR. Dr Mothilal received Bizz NXT Awards 2022 under the category of Top 50 Business Growth Leaders in technology at BizTalk World Conference, Dubai. He served as a member of the High-level Advisory Council of the World Internet Conference, Wuzhen, China as a nominee of Minister of Cyberspace Administration, China from 2015 to 2017. Dr Mothilal obtained Doctor of Business Administration from PPA Business School, Paris, with a distinction for his dissertation “Corporate Venture Capital as an engagement model for co-creating 5G ready services”. He has a MSc in IT from Keele University UK, MBA from PIM, SL, BSc (Engineering) SL, Post Graduate Diploma in Strategic Management from Maastricht School of Management, Netherland and a Postgraduate Diploma in Marketing Management from PIM SL.",
    linkedin:"https://www.linkedin.com/in/dr-mothilal-de-silva-387a2a/",
  },
  {
    name: "Dr. Mahendra Samarawickrama",
    title: "OECD.AI Expert, IEEE AI Standards Committee Member and WWF Governor, The Centre for Sustainable AI, Australia",
    image: "/images/corporateEvent/3-mahendra_samarawickrama.png",
    bio:"Dr. Mahendra Samarawickrama is a global leader in AI ethics, governance, and risk, advancing responsible AI towards sustainability. He received the prestigious Australian ICT Professional of the Year National Award in 2022 from the Australian Computer Society (ACS) and the IESL Recognition for Professional Excellence Award for Australia in 2023. He serves on the IEEE AI Standards Committee, contributing to the development of best practices in AI risk management, human-in-the-loop safeguards, and accountability frameworks. He has supported the development of international AI policies and governance strategies, including the establishment of guardrails for emerging technologies. \n\nHis innovative KITE AI Abstraction Framework was adopted by the United Nations to guide sustainable AI transformation. His AI contributions span global initiatives with the United Nations, IFRC, IEEE, OECD, WWF, and others, integrating AI with data literacy, business transformation, positive social impact, and environmental responsibility. With a strong focus on human-centred design, he brings ethical insight into frontier technologies such as neurotechnology, the metaverse, and consciousness. Dr. Samarawickrama operates at the intersection of leadership, policy, and innovation, shaping the future of AI to serve both people and the planet. ",
    linkedin:"https://www.linkedin.com/in/samarawickrama/",
  },
  {
    name: "Prof. Tulika Mitra",
    title: "Professor and Dean, School of Computing, National University of Singapore (NUS)",
    image: "/images/corporateEvent/4-tulika_mitra.png",
    bio:"Professor Tulika Mitra is Dean of the School of Computing and Vice-Provost (Special Projects) at the National University of Singapore. She holds the Provost’s Chair Professorship in Computer Science and joined NUS in 2001 after earning her PhD from Stony Brook University. \n\nHer research is known for pioneering hardware-software co-design in real-time embedded systems and energy-efficient AI accelerators. She leads major programmes like the NRF Competitive Research grant on low-power edge accelerators (2021–2026) and the MOE Tier-3 Green AI initiative (2025–2030). A dedicated community leader, she has served as Editor-in-Chief of ACM Transactions on Embedded Computing Systems and held key leadership roles in flagship conferences.",
    linkedin:"https://www.linkedin.com/in/tulika-mitra-6631813/",
  },
  {
    name: "Prof. Roshan Ragel",
    title: "Professor in Computer Engineering and Consultant CEO",
    image: "/images/corporateEvent/5-roshan_ragen.png",
    bio: "Professor Roshan G. Ragel is Professor of Computer Engineering at the University of Peradeniya and Consultant CEO of Lanka Education and Research Network (LEARN). His research spans AI/ML, IoT, wearable computing, bioinformatics, and dependable embedded systems, with over 200 peer-reviewed publications and supervision of 300+ undergraduates. \n\nHe was named Best Computer Scientist in Sri Lanka (2023–2025) and received the 2025 IEEE Computer Society Mary Kenneth Keller Undergraduate Teaching Award. At the national level, he has served on the Presidential Committee to formulate Sri Lanka’s AI Strategy, chaired national AI steering initiatives on AI Skills and Curriculum, and founded the AI Forum for Academics to advance responsible GenAI adoption in higher education.",
    linkedin:"https://www.linkedin.com/in/roshanragel/",
  },
  {
    name: "Prof. Chandana Gamage",
    title: "Professor in Computer Science & Engineering, University of Moratuwa",
    image: "/images/corporateEvent/6-prof_chandana_gamage.png",
    bio: "",
    linkedin:"https://www.linkedin.com/in/chandanagamage/",
  },
  {
    name: "Prof. Indika Karunathilake",
    title: "Vice Chancellor of University Of Colombo",
    image: "/images/corporateEvent/7-indika_karunathilake.png",
    bio: "Professor Indika Mahesh Karunathilake (MBBS (Col.), CTHE (Col.), DMedEd (Dundee), MMedEd (Dundee), FCGP (Hon., SL), FHEA (UK), FCME (SL), FRCP (Edin.). Professor Indika Karunathilake is a proud alumnus of the University of Colombo, who joined the academic staff in 2000, 25 years ago. With academic roots in both the University of Colombo and the University of Dundee (UK), he also holds senior fellowships from the UK Higher Education Academy and the Royal College of Physicians of Edinburgh. Professor Karunathilake is the first Professor of Medical Education at the University of Colombo and has been a transformative figure in the Sri Lankan higher education sector. At the time of his appointment as Vice Chancellor, he was the Head of the Department of Medical Education, Faculty of Medicine, and Colombo. In his capacity as a Medical Educationist, Professor Indika Karunathilake has made significant contributions towards curriculum development, curriculum evaluation, staff development and introduction of new courses for all the Faculties of Medicine in Sri Lanka. \n\nProfessor Indika Karunathilake has conducted extensive research and authored over 100 publications in peer-reviewed international journals and over 150 research presentations at international and national levels. He holds a H index of 19 and over 1700 citations and is a recipient of the President’s Award for Scientific Publications. Professor Karunathilake has held several leadership positions in the National Medical Association, SLMA, as Assistant Secretary from 2005 to 2007, Secretary in 2008 and 2010, Vice President in 2014 and the President during the most challenging year of 2020. He played a pivotal role during the nation’s battle against COVID 19. He held the position of Vice President of the Organization of Professional Associations (OPA) in 2021, 2023, and Editor in 2022. Professor Karunathilake is the founder President of the College of Medical Educationists and the head of the WHO Collaborating Centre for Medical Education, Faculty of Medicine, and Colombo.",
    linkedin:"https://www.linkedin.com/in/indika-karunathilake-b0b17a197/",
  },
  {
    name: "Dr. Murali Kailasam",
    title: "Managing Director of Nacstergen AI Pvt Ltd",
    image: "/images/corporateEvent/8-drmurali.png",
    bio: "Visionary, decisive, action-oriented, and results-focused professional offering 37+ years of experience in all facets of Entrepreneur, AI and Information Technology, with the last 28+ years focused on Technology and Business Management. Driven to excel by using technologies. Specialize and provides AI Solution and Industrial Automation solution using AI, Robotics, Machine Vision, Surface Error Detection, Conversational AI, Gen AI, Agentic AI Platform and Agents, ML, DL, Image Processing, Model Development using frameworks. Used object detection models / algorithms like YOLOV9, R-CNN, RT-DETR, RetinaNet and SSD. \n\nHave experience working industrial robot of type 6-Axis Industrial Robot, SCARA, DELTA, Gantry, Gantry-SCARA. Worked on I/O’s, teaching and programming of Robots brands like Epson, ABB, Yasakawa, Fairino, JZJRT and ESTUN. \n\nI have worked on Machine Vision for Surface Error Detection / Anomaly Detection and Bin Tracking Pick and Place with proper Orientation.",
    linkedin:"https://www.linkedin.com/in/muralikailasam/",
  },
  {
    name: "Mr. Ravi Shankar Bose",
    title: "Director of Fugumobile Limited",
    image: "/images/corporateEvent/9-ravi_shankar_bose.png",
    bio: "Ravi Shankar Bose is an AI strategy leader with 20+ years driving digital transformation for multinational brands. Based in Shanghai, he leads initiatives that embed AI to enhance customer engagement, streamline operations, and deliver measurable growth. He has directed cross-functional teams, advised on market expansion, and built scalable, responsible AI programs across regions. A frequent keynote speaker and panelist, Ravi shares pragmatic playbooks on AI adoption, the future of work, and ethical innovation. His expertise spans AI strategy and implementation, digital transformation and innovation, and business development.",
    linkedin:"https://www.linkedin.com/in/ravishankarbose/",
  },
  {
    name: "Ms. Jolene Wong",
    title: "Growth Hacker – In Chief, Digital Strategy & DX/AI Analytics/Capability & Change Management",
    image: "/images/corporateEvent/10-jolene_wong.png",
    bio: "Jolene is a dynamic ICT professional with deep expertise in digital transformation, Artificial Intelligence (AI), and advanced analytics. With extensive experience across corporate and startup ecosystems, she has participated in AI-driven initiatives such as agentic AI, AI powered platform and intelligent automation to drive business growth and operational efficiency. Her knowledge spans generative AI, analytics, and data strategy, enabling organizations to harness cutting-edge technologies for competitive advantage. A passionate advocate for innovation, she actively engages in public speaking, mentorship, and thought leadership, sharing insights on AI ethics, responsible adoption, and emerging digital trends. Her collaborative approach and strategic vision make her a trusted advisor and a sought-after speaker at global industry conferences and technology forums.",
    linkedin:"https://www.linkedin.com/in/jolene-wong1905/",
  },
  {
    name: "Mr. Raja Mansukhani",
    title: "Chief Strategy, Technology, and Transformation Officer of Comviva Technology Limited (A Tech Mahindra Company)",
    image: "/images/corporateEvent/11-raja_mansukhani.png",
    bio: "With over 24 years of global industry experience, Raja has held diverse leadership roles across Telecommunications, Digital Platforms, Fintech Services, and Software Products. His career spans launching new businesses, products, and technologies, as well as leading large-scale transformations. Currently, as Comviva’s Chief Strategy, Technology, and Transformation Officer, Raja is spearheading the company’s ambitious Comviva 2.0 vision - driving AI-led Technology innovation, shaping business strategy and leading companywide transformation initiatives. Prior to joining Comviva, Raja held senior leadership positions at the Axiata Group and played key roles in transformational programs at Ericsson, Tech Mahindra, and Tata Teleservices.",
    linkedin:"https://www.linkedin.com/in/rajamansukhani/",
  },
  {
    name: "Mr. Amit Ghulani",
    title: "Businees Unit Head/CEO for Software Analyticals & AI of Esyasoft",
    image: "/images/corporateEvent/12-amit_ghulani.png",
    bio: "",
    linkedin:"https://www.linkedin.com/in/amit-ghulani-a540804/",
  },
  {
    name: "Mr. Rohit Kanwar",
    title: "Director of Deloitte Consulting Singapore",
    image: "/images/corporateEvent/13-rohit_ranwar.png",
    bio: "Rohit Kanwar brings 20+ years of Experience with Telecom and High Tech Industries. He erved multiple leadership positions in India, China, USA and Indonesia worked with Fortune 100 companies such as Huawei Technologies, Nortel Networks, Accenture and Axiata group etc. Currently he is building and advising companies on Next Generation Autonomous state of the art wireless and fixed networks. He is a certified professional in the area of deep learning and mathematical modeling to create neural networks for intent based Network Automation. \n\nHe also specializes in Operationalizing AI into the organization and nurtures the operating model required to bring the change in the domain of people, process and technology. \n\nRohit is an MBA from INSEAD and an active participant, contributor in the AI Forums.",
    linkedin:"https://www.linkedin.com/in/rohit-kanwar-b887737/",
  },
  {
    name: "Mr. Vijai Karthigesu",
    title: "Founder & CEO of Swarmio",
    image: "/images/corporateEvent/14-vijai_karthigesu.png",
    bio: "Vijai Karthigesu is a senior technology executive, serial entrepreneur, and thought leader with over 25 years of experience building platforms at the intersection of AI, edge computing, telecom infrastructure, cloud, and digital economies. He began his career on Canada’s national fibre and Internet backbone with Shaw, Rogers, and Group Telecom (later acquired by Bell Canada). At the Ontario Ministry of Health, he led the deployment of the province-wide health network and the data-centre/cloud infrastructure that hosts electronic health data under the highest standards of availability, security, privacy, and data sovereignty. As founder and CEO of Swarmio, Vijai created edge-enabled platforms that transform telcos into gateways for gamers.",
    linkedin:"https://www.linkedin.com/in/vijaikarthigesu/",
  },
  {
    name: "Mr. Heminda Jayaweera",
    title: "Executive Director of TRACE Sri Lanka",
    image: "/images/corporateEvent/15-heminda_jayaweera.png",
    bio: "Heminda Jayaweera is a recipient of prestigious Eisenhower Fellowship for year 2021. Heminda is currently Executive Director of TRACE Sri Lanka (www.trace.lk). Heminda has obtained his bachelor’s degree in Electronics and Telecommunication Engineering from the University of Moratuwa. He has worked over a decade in Dialog Axiata and Axiata Group specializing in new product and innovation management. He has product innovation consulting experience in Malaysia, Bangladesh and Cambodia. \n\nHeminda, as the Senior Fellow in Innovation and Entrepreneurship of University of Moratuwa, started Mora Ventures, University of Moratuwa based startup incubator. \n\nHe was formerly the Chief Operating Officer (COO) of SLINTEC (www.slintec.lk), the pioneer nano-tech and advanced research facility in Sri Lanka. \n\nHeminda is also a serial innovator and entrepreneur. He co-founded Jendo ( www.JendoInnovations.com ), a med-tech AI start-up which has patents in US and Japan for a non-invasive medical device to identify cardiovascular diseases. He also co-founded Thuru (www.thuru.lk), a green-tech initiative and also cofounded 3H Innovations, a startup built to value-add Sri Lankan endemic and native plants based extracts to develop superfoods and nutraceuticals. \n\nHe is a director of Effective Solutions (Pvt) Ltd, an IoT and AI Company and He is also a director at Vibhava Solutions (Pvt) Ltd, a company working on solutions related to plastic recycling and up-cycling. Heminda was a Director of Ceylon Graphene Technologies, the first Graphene and advanced material company in Sri Lanka. \n\nHeminda is a Council Member at National Innovation Agency (www.nia.gov.lk), the apex body on innovation in Sri Lanka and also an advisor to ICTA (www.icta.lk), the apex body for Information and Communication Technology in Sri Lanka.",
    linkedin:"https://www.linkedin.com/in/heminda/",
  },
  {
    name: "Mr. Keerthi Kodithuwakku",
    title: "Chairman/CEO of Jendo Innovations Ltd",
    image: "/images/corporateEvent/16-keerthi_kodithuwakku.png",
    bio: "Keerthi Kodithuwakku is the Chairman and CEO of Jendo Innovations Ltd, a biomedical research and development company with a strong presence in Sri Lanka and Japan. An award-winning technopreneur, Keerthi drives Jendo’s mission to revolutionize healthcare through advanced biomedical solutions. He holds a U.S. patent for vascular health monitoring technology and has led the development of innovations addressing chronic kidney disease and dengue detection. Recognized as CEO of the Year and Emerging ICT Leader of the Year, his leadership has positioned Jendo as a globally competitive startup. With a passion for Industry 4.0, Keerthi continues to inspire innovation, empower young entrepreneurs, and shape the future of biomedical engineering.",
    linkedin:"https://www.linkedin.com/in/keerthi-kodithuwakku-b98149219/",
  },
  {
    name: "Mr. Gayath Ratnayake",
    title: "Chief Technology Officer of Pick Me",
    image: "/images/corporateEvent/17-gayath_ratnayake.png",
    bio: "",
    linkedin:"https://www.linkedin.com/in/gayath/",
  },
  {
    name: "Ms. Chathini Uduwana",
    title: "Country Head and Vice President, People at Typefi Systems",
    image: "/images/corporateEvent/18-chathini_uduwana.png",
    bio: "A globally recognized publishing automation company. She founded the Sri Lankan arm of Typefi in 2014 and currently serves as a member of the company’s global executive team, which spans offices in the USA, UK, Netherlands, and Sri Lanka. In her leadership role, she brings strategic vision and a people-first approach to building a high-performing, awardwinning workplace culture. \n\nA passionate advocate for gender equity in STEM, Chathini is the founding force behind the Sri Lankan chapter of Women in Tech, a global movement headquartered in Paris. Through mentorship, strategic partnerships, and community engagement, she champions the advancement of women in the technology sector—creating pathways not just for entry, but also for sustainable success and leadership. \n\nChathini holds a Bachelor’s degree in Business Information Technology and an MBA, is a Chartered IT Professional, and is currently pursuing her doctoral research at the University of Colombo. Her work bridges leadership, technology, and social impact, positioning her as a driving force for both innovation and inclusion in the industry.",
    linkedin:"https://www.linkedin.com/in/chathini/",
  },
  {
    name: "Mr. Ice Wang",
    title: "Vice President /Government Public Services Digitalization BU Huawei, Huawei",
    image: "/images/corporateEvent/19-icewang.png",
    bio: "Mr.Wang is primarily responsible for global market insights, top level planning, solution design, and brand marketing for the GPSD BU. With extensive experience in smart city construction and government digital transformation, he actively promotes the implementation of Huawei’s Urban Intelligence Solutions, serving power over 160 core cities and regions worldwide. He is committed to enhancing urban government efficiency and government service levels through technological innovations.",
    linkedin:"",
  },
  {
    name: "Mr. Johnny Lyu",
    title: "CTO for international business of Huawei Hybrid Cloud, Huawei",
    image: "/images/corporateEvent/20-johnnyluy.png",
    bio: "Mr.Lye is responisbible for strategic planning of the international market of Huawei Cloud Stack, including product combination, investment and marketing strategies, competitiveness enhancement and international expansion and delivery. \n\nMr.Lye, a senior technical expert in cloud computing, storage and big data has served as Deputy Director of Data Center Solution Dept, IT and Director of Huawei Cloud Disaster Recovery Solution. He has led the initiation, planning and implementation of multiple major projects. Mr.Lye has more than 15 years of experience working in cloud computing.",
    linkedin:"",
  },
  {
    name: "Mr. Tony Kalcina",
    title: "Government National Sovereign AI & Data Advisor",
    image: "/images/corporateEvent/21-tonykalcina.png",
    bio: "Tony Kalcina is a globally recognized expert in Sovereign Artificial Intelligence, National Data Strategy, and Digital Infrastructure. He currently serves as Global Ambassador for AI & Data at TM Forum, the global authority on AI powered Digital Transformation, and is a trusted independent advisor and Director to technology companies and governments across the USA, Asia, Europe, and Australia. With over 40 years of experience across Government, Telecom, and AI-enabled Digital Ecosystems, Tony has led national and enterprise-scale AI, 5G, and sovereign data initiatives — blending deep technical acumen with policy-level advisory and commercialization expertise. Leading the Technology design of Malaysia’s Time Telekom in 1993, and the Axiata Big Data ML Data Ocean Program in 2012, and the technical evaluation of MCMC DNB RAN tender in 2021. \n\nGlobal Leadership in National Sovereign AI & Data o Advisor to national governments and sovereign cloud initiatives on AI governance, trust architecture, and secure digital infrastructure. o Keynote speaker and global thought leader on AI Sovereignty, Digital Trust, and National Cloud Platforms. o Deep understanding of regulatory, ethical, and national security imperatives in AI and cross-border data flows. \n\nTrusted Advisor to Public & Private Sectors o Appointed Australian Government Commercialization Mentor, guiding Deep Tech and AI ventures into sovereign-aligned pathways. o Independent Board Director in leading AI, IoT, Cybersecurity, and Biometric Security companies and startups with deployments across the US, Europe, ASEAN, and ANZ. \n\nRegional Telecom & Government AI Transformation Experience Former senior executive at Telstra, Time Telekom and My Republic, including leadership in R&D, Network Engineering & Operations, and Technology Strategy. Delivered national multibillion digital infrastructure projects including 5G Core/ORAN Tenders, Sovereign Data Platforms and Cloud-native National Automation Operational Management Systems. Directed Digital & AI Maturity and Transformation programs for Governments and Telcos as CTO for Global System Integrators. \n\nPioneer in AI-Driven National Platforms - Founder or Advisory Board of Startup, Private and Public Companies Clarity - Gartner Magic Quadrant, ASX-listed global operational management platform. Biometry - Continuous KYC and Zero Trust Biometric Identity Platform. Nextqore - AI-led digitization of passive National Infrastructure. Cooltrax - Cold Chain Asset monitoring for food and pharmaceutical security. Emagine - AI-driven customer value analytics Velodx - AI-driven Drone platforms empowering operator productivity. \n\nSpecializations o National Digital Sovereignty Architecture o Secure & Trusted AI Infrastructure (Cloud, Edge, 5G) o Data Governance, Ethics, and AI Trust Frameworks o Digital Identity and Continuous KYC Platforms o Cross-border Data & Sovereign Digital Asset Protection. Public-private innovation ecosystems.",
    linkedin:"https://www.linkedin.com/in/tonykalcina/",
  },
  {
    name: "Trishma Pinto",
    title: "Presenter",
    image: "/images/corporateEvent/22-trishma.png",
    bio: "Trishma Pinto is an award-winning speaker and events presenter, recognized for her expertise and professionalism in captivating audiences. \n\nHer dynamic presence and engaging style have made her the preferred choice as Master of Ceremonies for leading businesses and brands. \n\nWith a strong foundation in Speech and Drama, certified by Trinity Guildhall, London,Trishma brings a distinctive flair and elegance to every stage she graces. \n\nShe has also earned the Distinguished Toastmaster (DTM) designation - the highest honor awarded by Toastmasters International - further affirming her commitment to excellence in communication and leadership.",
    linkedin:"",
  },
];

export function EventLineup() {
  const [showFull, setShowFull] = useState(false);

  const displayedSpeakers = showFull ? speakers : speakers.slice(0, 5);
  return (
    <div className="">
      <motion.h3
        className="text-xl font-bold mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Speaker Lineup
      </motion.h3>

      <div className="space-y-2 relative">
        {displayedSpeakers.map((speaker, index) => (
          <motion.div
            key={speaker.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
          >
            <Speaker {...speaker} />
          </motion.div>
        ))}

        <AnimatePresence>
          {!showFull && speakers.length > 5 && (
            <motion.div
              key="see-more-overlay"
              className="absolute bottom-0 left-0 right-0 z-10 pt-16 pb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {/* Fade overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* See Full Lineup Button */}
              <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <motion.button
                  onClick={() => setShowFull(true)}
                  className="px-6 py-2 bg-[#0E5344] hover:bg-[#0E5344]/90 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-xs sm:text-sm"
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  See Full Lineup
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* See Less Button */}
        <AnimatePresence>
          {showFull && (
            <motion.div
              key="see-less-button"
              className="text-center mt-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
            >
              <motion.button
                onClick={() => setShowFull(false)}
                className="px-6 py-2 bg-gray-100 text-xs text-gray-500 cursor-pointer rounded-full border border-gray-200 font-semibold hover:bg-gray-200 transition-all duration-200"
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                See Less
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
