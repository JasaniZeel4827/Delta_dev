// // export type Work = {
// //   company: string
// //   deliverable: string[]
// //   fromDate: string
// //   toDate: string
// // }

// // export const worksData: Work[] = [
// //   {
// //     company: 'Delta Crops Ltd.',
// //     deliverable: [
// //       'Developed a web application to manage the company’s inventory and sales.',
// //       'Implemented a barcode scanner to track inventory.',
// //     ],
// //     fromDate: '2022-04',
// //     toDate: 'Present',
// //   },
// //   {
// //     company: 'NextGen Software',
// //     deliverable: [
// //       'Developed a full-stack e-commerce platform with product listings, cart functionality, and payment integration.',
// //       'Integrated a payment gateway for seamless transactions.',
// //     ],
// //     fromDate: '2017-08',
// //     toDate: '2019-02',
// //   },
// // ]




// // export type Work = {
// //   company: string;
// //   position?: string; // Added 'position' as an optional field to better describe roles like "Intern" or "Team Lead" for hackathons.
// //   deliverable: string[];
// //   fromDate: string;
// //   toDate: string;
// // };

// // export const worksData: Work[] = [
// //   // --- Internships (2 entries) ---
// //   {
// //     company: 'Tech Rover Solutions Pvt Ltd', // Replace with actual company name
// //     position: 'Generative AI Intern',
// //     deliverable: [
// //       'Developed and fine-tuned a custom large language model (LLM) for specific industry tasks using PyTorch and Hugging Face Transformers.',
// //       'Implemented RAG (Retrieval-Augmented Generation) pipeline to enhance LLM responses with real-time data.',
// //       'Contributed to the development of a Streamlit-based prototype showcasing AI capabilities.',
// //       'Collaborated with senior researchers on optimizing model inference speed on cloud platforms.',
// //     ],
// //     fromDate: '2024-06', // Example dates: June 2024
// //     toDate: '2024-09', // Example dates: September 2024
// //   },
// //   {
// //     company: 'Noble University of Engineering', // IMPORTANT: Replace with your actual university name
// //     position: 'Software Development Intern (Academic Project)',
// //     deliverable: [
// //       'Contributed to a research project on real-time data visualization by building interactive dashboards using React and D3.js.',
// //       'Assisted in designing and implementing RESTful APIs with Flask for data backend.',
// //       'Wrote comprehensive unit and integration tests, increasing code coverage by 15%.',
// //     ],
// //     fromDate: '2023-01', // Example dates: January 2023
// //     toDate: '2023-05', // Example dates: May 2023
// //   },

// //   // --- Hackathons (4 entries, including 2 winners/runner-ups) ---

// //   // Hackathon 1 (Winner/Runner-up)
// //   {
// //     company: 'University Hackathon 2024', // Replace with actual hackathon name and year
// //     position: 'Team Lead - Runner-Up (Top 5%)', // Or 'Winner' / 'First Place'
// //     deliverable: [
// //       'Developed an AI-powered real-time sign language translator using TensorFlow and custom computer vision models in just 48 hours.',
// //       'Achieved 92% accuracy on the test set for key functionality.',
// //       'Presented solution to a panel of industry experts, receiving commendation for innovation and technical execution.',
// //     ],
// //     fromDate: '2024-03-15', // Specific start date of hackathon
// //     toDate: '2024-03-17', // Specific end date of hackathon
// //   },
// //   // Hackathon 2 (Winner/Runner-up)
// //   {
// //     company: 'CodeFest 2023', // Replace with actual hackathon name and year
// //     position: 'Participant - Winner (Best Use of Google Cloud API)', // e.g., 'Best Use of [Specific Technology/API]'
// //     deliverable: [
// //       'Built a blockchain-based supply chain tracker prototype from scratch, incorporating smart contracts on Ethereum.',
// //       'Successfully integrated Chainlink for data oracle services.',
// //       'Collaborated effectively within a team of 4 developers under tight deadlines.',
// //     ],
// //     fromDate: '2023-10-20', // Specific start date of hackathon
// //     toDate: '2023-10-22', // Specific end date of hackathon
// //   },
// //   // Hackathon 3 (General Participation)
// //   {
// //     company: 'Data Science Challenge 2023', // Replace with actual hackathon name and year
// //     position: 'Data Analyst / ML Engineer',
// //     deliverable: [
// //       'Analyzed a large dataset of customer purchasing behavior to identify key trends and predict churn risk.',
// //       'Developed predictive models using scikit-learn and performed extensive data visualization using Matplotlib.',
// //       'Contributed to the team\'s final report and presentation of insights.',
// //     ],
// //     fromDate: '2023-07-07', // Specific start date of hackathon
// //     toDate: '2023-07-09', // Specific end date of hackathon
// //   },
// //   // Hackathon 4 (General Participation)
// //   {
// //     company: 'WebDev Sprint 2022', // Replace with actual hackathon name and year
// //     position: 'Front-End Developer',
// //     deliverable: [
// //       'Designed and implemented the user interface for a local community platform using React and Chakra UI.',
// //       'Ensured responsive design across various devices and optimized for performance.',
// //       'Collaborated with backend developers to integrate API endpoints for dynamic content loading.',
// //     ],
// //     fromDate: '2022-04-01', // Specific start date of hackathon
// //     toDate: '2022-04-03', // Specific end date of hackathon
// //   },
// // ];




// // ai code testing

// export type Work = {
//   company: string;
//   position?: string;
//   deliverable: string[];
//   fromDate: string;
//   toDate: string;
// };

// export const worksData: Work[] = [
//   // --- Internships (2 entries) ---
//   {
//     company: 'Tech Rover Solutions Pvt Ltd', // Example Company (Gen AI focused, easier level)
//     position: 'Junior AI Development Intern',
//     deliverable: [
//       'Utilized OpenAI and Hugging Face APIs to build simple text generation and image recognition prototypes.',
//       'Assisted in preparing and cleaning datasets for training small custom models.',
//       'Developed basic web interfaces using Streamlit for demonstrating AI functionalities.',
//       'Explored various pre-trained models and their applications for content creation.',
//     ],
//     fromDate: '2024-06',
//     toDate: '2024-09',
//   },
//   {
//     company: 'Noble University Tech Dept.', // University Internship (Development, intermediate level)
//     position: 'Software Development Intern',
//     deliverable: [
//       'Developed and optimized backend APIs using Node.js and Express, handling moderate data loads and ensuring data integrity.',
//       'Integrated third-party services and payment gateways for a university project, managing API keys and securing transactions.',
//       'Implemented front-end components with React, focusing on reusable components and state management.',
//       'Participated in code reviews and contributed to improving team coding standards.',
//     ],
//     fromDate: '2023-01',
//     toDate: '2023-05',
//   },

//   // --- Hackathons (4 entries, including 2 winners/runner-ups) ---

//   // Hackathon 1 (Winner/Runner-up - Gen AI Easy Level)
//   {
//     company: 'AI Challenge Hackathon 2025', // e.g., 'AI Challenge Hackathon 2024'
//     position: 'Team Lead - Winner (Most Creative AI App)', // Or 'Runner-Up'
//     deliverable: [
//       'Developed a novel AI application that [briefly describe, e.g., "generates personalized bedtime stories"] using pre-trained language models and a simple prompt engineering approach.',
//       'Integrated a basic text-to-speech API to enhance user experience within the 48-hour timeframe.',
//       'Designed an intuitive user interface for easy interaction with the AI model.',
//     ],
//     fromDate: '2024-03-15',
//     toDate: '2024-03-17',
//   },
//   // Hackathon 2 (Winner/Runner-up - Development Intermediate Level)
//   {
//     company: 'Smart City Hack 2024', // e.g., 'Smart City Hack 2023'
//     position: 'Full Stack Engineer - Runner-Up (Best Solution for Urban Planning)',
//     deliverable: [
//       'Built a data visualization platform displaying real-time city data using Next.js and a Flask backend.',
//       'Implemented robust data filtering and search functionalities, handling complex queries efficiently.',
//       'Deployed the application using Docker containers, ensuring cross-platform compatibility.',
//       'Optimized database queries for PostgreSQL, achieving fast load times for large datasets.',
//     ],
//     fromDate: '2023-10-20',
//     toDate: '2023-10-22',
//   },
//    {
//     company: 'Prompt Pioneers Fest 2023',
//     position: 'AI Prompt Engineer',
//     deliverable: [
//       'Experimented with various prompting techniques, including role-playing and constraint-based prompting, to guide large language models (e.g., LLaMA 2) to generate specific marketing copy for fictional products.',
//       'Evaluated the quality and relevance of AI-generated marketing outputs based on predefined criteria like persuasiveness and clarity, improving average score by 10%.',
//       'Documented effective prompt strategies and shared a detailed guide on best practices for creative content generation with the hackathon team members.',
//     ],
//     fromDate: '2023-07-07',
//     toDate: '2023-07-09',
//   },
  
//   // Hackathon 4 (General Participation - Development Intermediate Level)
//   {
//     company: 'Open Source Contribution Gujarat Institute of Technology', // e.g., 'Open Source Contribution Hack 2022'
//     position: 'Software Development Intern (Academic Project)',
//     deliverable: [
//       'Developed and optimized backend APIs for an online library management system using Node.js and Express, handling up to 100 concurrent requests.',
//       'Integrated third-party services like Stripe for payment processing for a university event management platform, managing API keys securely.',
//       'Implemented responsive front-end components for a student portal with React and Chakra UI, enhancing user navigation.',
//       'Participated in daily stand-ups and contributed to improving team coding standards by documenting best practices for API design.',
//     ],
//     fromDate: '2022-04-01',
//     toDate: '2022-04-03',
//   },
// ];




// export type Work = {
//   company: string;
//   position?: string;
//   deliverable: string[];
//   fromDate: string;
//   toDate: string;
// };





export type Work = {
  company: string;
  position?: string;
  deliverable: string[];
  fromDate: string;
  toDate: string;
};

export const worksData: Work[] = [
  {
    company: 'Tech Rover – Web Development Internship',
    position: 'Frontend Intern',
    deliverable: [
      'Worked on developing web interfaces using React and Tailwind CSS.',
      'Assisted in creating responsive UI components for real client projects.',
      'Collaborated with senior developers on improving application performance and usability.'
    ],
    fromDate: '2024-01',
    toDate: '2024-02',
  },
  {
    company: 'IIT Madras – Full Stack Web Dev with GenAI (by Coding Ninjas)',
    position: 'Full Stack Intern',
    deliverable: [
      'Completed an internship focused on building full-stack web applications with integrated GenAI features.',
      'Developed projects using React, Node.js, and MongoDB with OpenAI APIs for intelligent features.',
      'Built a chatbot module using Generative AI and prompt engineering concepts.',
      'Learned deployment practices and participated in weekly evaluations and mentorship sessions.'
    ],
    fromDate: '2023-05',
    toDate: '2026-09',
  },
  // {
  //   company: 'AI Hackathon – College Level',
  //   position: 'Hackathon Participant',
  //   deliverable: [
  //     'Participated in a 48-hour college hackathon focused on AI-powered solutions.',
  //     'Worked on a team project that used OpenAI API for generating personalized content.',
  //     'Contributed to both backend integration and frontend UI/UX design.'
  //   ],
  //   fromDate: '2025-03-15',
  //   toDate: '2025-03-17',
  // },

   {
    company: 'College Level Hackathon',
    position: 'Team Project Developer',
    deliverable: [
      'Participated in a 48-hour hackathon organized at the college level.',
      'Built a web-based educational game designed to teach the fundamental concepts of programming and visual effects.',
      'Focused on making the platform beginner-friendly and accessible to non-technical users.',
      'Collaborated with teammates to ensure engaging design, interactivity, and learning effectiveness.'
    ],
    fromDate: '2025-01-09',
    toDate: '2025-01-11',
  },
];
