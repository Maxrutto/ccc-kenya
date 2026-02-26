// Mock Sanity client for static data
export const client = {
  fetch: async (query) => {
    // Check if we're querying monasteries
    if (query.includes("monastery")) {
      return monasteries;
    }
    // Check if we're querying news
    else if (query.includes("news")) {
      return newsArticles;
    }
    // Check if we're querying categories
    else if (query.includes("category")) {
      return categories;
    }
    
    // Default return empty array
    return [];
  }
};

// Static list of categories
const categories = [
  {
    _id: 'cat-1',
    title: 'Events',
  },
  {
    _id: 'cat-2',
    title: 'Formation',
  },
  {
    _id: 'cat-3',
    title: 'Prayer Intentions',
  },
  {
    _id: 'cat-4',
    title: 'Announcements',
  },
];

// Static list of news articles
const newsArticles = [
  {
    _id: 'news-new-4',
    title: 'Initial and On-Going Formation Courses Schedule (2026/2027)',
    slug: { current: 'formation-courses-2026-2027' },
    excerpt: 'CCCK announces the full schedule of initial and on-going formation courses for 2026/2027, covering theology of the vows, formation of formators, human formation, magisterial documents, safeguarding, conflict management, and more.',
    body: [
      // --- COURSE 1 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 1: MARCH 2026', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Course Title: ', marks: ['strong'] }, { _type: 'span', text: 'Theology of the Vows' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'Novices & Junior Sisters from CCCK Member Monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Facilitator: ', marks: ['strong'] }, { _type: 'span', text: 'Fr. Misheck Theresa (Cont. of the Heart of Christ)' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'Online' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Schedule: ', marks: ['strong'] }, { _type: 'span', text: '3:00 p.m - 6:00 p.m. (twice per week for one month) — Fridays & Saturdays' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '3:00 p.m. - 4:30 p.m. Course session part one' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:30 p.m. - 4:45 p.m. Break' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:45 p.m. - 6:00 p.m. Course session part two' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Dates: ', marks: ['strong'] }, { _type: 'span', text: '6th, 7th, 13th, 14th, 20th, 21st, 27th & 28th March' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- COURSE 2 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 2: FORMATION OF FORMATORS', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Dates: ', marks: ['strong'] }, { _type: 'span', text: 'April 13th - April 29th, 2026' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Venue: ', marks: ['strong'] }, { _type: 'span', text: 'Dominican Nuns Monastery Guest House — Karen, Nairobi' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'Formators from CCCK Full and Associate Member Monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'In-Person' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- COURSE 3 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 3: MAY 2026 — HUMAN FORMATION', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Course Title: ', marks: ['strong'] }, { _type: 'span', text: 'Self Awareness' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Dates: ', marks: ['strong'] }, { _type: 'span', text: 'May 1st - 15th, 2026' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'Aspirants and Postulants' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Instructor: ', marks: ['strong'] }, { _type: 'span', text: 'Sr. Mary Gitau' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'Online' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Days: ', marks: ['strong'] }, { _type: 'span', text: 'Mondays, Wednesdays & Fridays' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Schedule: ', marks: ['strong'] }, { _type: 'span', text: '3:00 p.m - 6:00 p.m. (as in March above)' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- COURSE 4 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 4: ONGOING FORMATION — JUNE 2026', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Course Title: ', marks: ['strong'] }, { _type: 'span', text: 'Magisterial Documents — The Gift of Faithfulness, the Joy of Perseverance' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'All the nuns from CCCK Full and Associate Member Monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Facilitator: ', marks: ['strong'] }, { _type: 'span', text: 'Fr. Thembo, OMI' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'Online' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Schedule: ', marks: ['strong'] }, { _type: 'span', text: '3:00 p.m - 6:00 p.m. (twice per week for one month) — Fridays & Saturdays' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '3:00 p.m. - 4:30 p.m. Course session part one' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:30 p.m. - 4:45 p.m. Break' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:45 p.m. - 6:00 p.m. Course session part two' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- COURSE 5 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 5: SAFEGUARDING & PROTECTION OF MINORS AND VULNERABLE PERSONS', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Course Title: ', marks: ['strong'] }, { _type: 'span', text: 'Establishing the Right Protocols in CCCK Member Monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'Nuns from CCCK Full and Associate Member Monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Facilitator: ', marks: ['strong'] }, { _type: 'span', text: 'Sr. Mumbi Kigutha (to be confirmed)' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'Online' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Schedule: ', marks: ['strong'] }, { _type: 'span', text: '3:30 p.m - 6:00 p.m. (once per week) — Fridays' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '3:30 p.m. - 4:30 p.m. Course session part one' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:30 p.m. - 4:45 p.m. Break' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:45 p.m. - 6:00 p.m. Course session part two' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Dates: ', marks: ['strong'] }, { _type: 'span', text: '7th, 14th, 21st, 28th August 2026' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- COURSE 6 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 6: FORMATION OF SUPERIORS — OCTOBER 2026', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Course Title: ', marks: ['strong'] }, { _type: 'span', text: 'Conflicts Management in Groups and Organizations' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'The Superiors from CCCK Full and Associate Member Monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'Online' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Date: ', marks: ['strong'] }, { _type: 'span', text: 'October 2026' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Schedule: ', marks: ['strong'] }, { _type: 'span', text: '3:00 p.m - 6:00 p.m. (twice per week for one month) — Fridays & Saturdays' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '3:00 p.m. - 4:30 p.m. Course session part one' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:30 p.m. - 4:45 p.m. Break' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:45 p.m. - 6:00 p.m. Course session part two' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- COURSE 7 ---
      { _type: 'block', children: [{ _type: 'span', text: 'COURSE 7: SELF AWARENESS — NOVEMBER 2026', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Course Title: ', marks: ['strong'] }, { _type: 'span', text: 'Transactional Analysis' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'Aspirants, Postulants & Novices' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Facilitator: ', marks: ['strong'] }, { _type: 'span', text: 'To be confirmed' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode of Study: ', marks: ['strong'] }, { _type: 'span', text: 'Online' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Schedule: ', marks: ['strong'] }, { _type: 'span', text: '3:00 p.m - 6:00 p.m. (twice per week for one month) — Fridays & Saturdays' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '3:00 p.m. - 4:30 p.m. Course session part one' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:30 p.m. - 4:45 p.m. Break' }] },
      { _type: 'block', listItem: 'bullet', children: [{ _type: 'span', text: '4:45 p.m. - 6:00 p.m. Course session part two' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Dates: ', marks: ['strong'] }, { _type: 'span', text: 'Every Friday and Saturday in November 2026' }] },
      { _type: 'block', children: [{ _type: 'span', text: '' }] },

      // --- TRAININGS FOR CARE OF THE ELDERLY ---
      { _type: 'block', children: [{ _type: 'span', text: 'TRAININGS FOR THE CARE OF THE ELDERLY — GERIATRICS', marks: ['strong'] }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Date: ', marks: ['strong'] }, { _type: 'span', text: 'February 2027' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Participants: ', marks: ['strong'] }, { _type: 'span', text: 'Selected nuns from the member monasteries' }] },
      { _type: 'block', children: [{ _type: 'span', text: 'Mode: ', marks: ['strong'] }, { _type: 'span', text: 'Online/Onsite — to be confirmed soon' }] },
    ],
    mainImage: { asset: { _ref: 'image-3' } },
    publishedAt: '2026-02-26T00:00:00Z',
    categories: [
      { _id: 'cat-2', title: 'Formation' },
      { _id: 'cat-1', title: 'Events' }
    ],
    author: {
      name: 'CCCK Communications',
      image: { asset: { _ref: 'image-1' } }
    }
  },
  {
    _id: 'news-new-1',
    title: 'Opening Mass for 7th CCCK Executive Meeting - September 23rd, 2025',
    slug: { current: 'ccck-opening-mass-sept-23-2025' },
    excerpt: 'Join us for the opening mass of the 7th CCCK Executive Meeting on September 23rd afternoon at Dimesse Retreat Center, Karen Nairobi, presided over by Rev. Bishop Dominic Kimengich.',
    body: [
      {
        _type: 'block',
        children: [
          { _type: 'span', text: 'There is an opening mass on 23rd September afternoon at Dimesse Retreat center, Karen Nairobi. This opening mass marks the beginning of the 7th CCCK Executive Meeting and will be presided over by Rev. Bishop Dominic Kimengich of the Catholic Diocese of Eldoret. All are welcome to join us in this important celebration as we gather in prayer and fellowship.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'bishop-kimengich' } },
    publishedAt: '2025-09-23T14:00:00Z',
    categories: [
      { _id: 'cat-1', title: 'Events' },
      { _id: 'cat-4', title: 'Announcements' }
    ],
    author: {
      name: 'CCCK Communications',
      image: { asset: { _ref: 'image-1' } }
    }
  },
  {
    _id: 'news-new-2',
    title: 'CCCK 10th Anniversary Celebration - September 29, 2025',
    slug: { current: 'ccck-10th-anniversary-2025' },
    excerpt: '10th anniversary celebrations at the Dominican nuns guest house compound on 29th September. Opening mass for the 7th CCCK Executive meeting on the occasion of the 10th anniversary of the foundation of CCCK, presided over by His Grace Right Rev. Archbishop Philip Anyolo.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'Opening mass for the 7th CCCK Executive meeting on the occasion of the 10th anniversary of the foundation of CCCK. The 10th anniversary celebrations are at the Dominican nuns guest house compound on 29th September. The celebration for the 10th anniversary of the foundation of CCCK will be on September 29th, 2025, with Holy Mass presided over by His Grace Right Rev. Archbishop Philip Anyolo of the Catholic Archdiocese of Nairobi. This milestone celebration marks a decade of faithful service and contemplative witness across Anglophone Africa.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'ccck-10-years' } },
    publishedAt: '2025-09-29T00:00:00Z',
    categories: [
      { _id: 'cat-1', title: 'Events' },
      { _id: 'cat-4', title: 'Announcements' }
    ],
    author: {
      name: 'CCCK Communications',
      image: { asset: { _ref: 'philip-anyolo' } }
    }
  },
  {
    _id: 'news-new-3',
    title: 'First VENITE SEORSUM Program Graduates to Receive Certificates',
    slug: { current: 'venite-seorsum-graduates-2025' },
    excerpt: 'The first group of sisters completing the three-year VENITE SEORSUM THEOLOGY PROGRAM will receive certificates on September 29th, 2025.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'On 29th September 2025 the first group of sisters, the beneficiaries of the VENITE SEORSUM THEOLOGY PROGRAM for contemplative nuns will be gifted and given certificates upon completion of their three year program which began in 2023.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-3' } },
    publishedAt: '2025-09-29T00:00:00Z',
    categories: [
      { _id: 'cat-1', title: 'Events' },
      { _id: 'cat-2', title: 'Formation' },
      { _id: 'cat-4', title: 'Announcements' }
    ],
    author: {
      name: 'CCCK Communications',
      image: { asset: { _ref: 'image-1' } }
    }
  },
  {
    _id: 'news-1',
    title: 'Annual Contemplative Conference 2023',
    slug: { current: 'annual-conference-2023' },
    excerpt: 'Join us for our annual conference gathering contemplative communities from across East Africa.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'The Conference of Contemplative Communities of Kenya (CCCK) is pleased to announce our annual conference, which will take place at the Resurrection Garden Retreat Center in Nairobi from September 15-17, 2023.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-1' } },
    publishedAt: '2023-08-01T00:00:00Z',
    categories: [
      { _id: 'cat-1', title: 'Events' },
      { _id: 'cat-4', title: 'Announcements' }
    ],
    author: {
      name: 'Sister Maria Teresa',
      image: { asset: { _ref: 'image-2' } }
    }
  },
  {
    _id: 'news-2',
    title: 'New Formation Program for Novices',
    slug: { current: 'formation-program-novices' },
    excerpt: 'A comprehensive formation program has been developed for novices across our member communities.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'We are excited to announce a new standardized formation program for novices that will help ensure consistent spiritual and practical training across all our member communities. The program covers prayer traditions, spiritual direction, and the unique charisms of each order.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-3' } },
    publishedAt: '2023-07-15T00:00:00Z',
    categories: [
      { _id: 'cat-2', title: 'Formation' }
    ],
    author: {
      name: 'Sister Lucy Waithera',
      image: { asset: { _ref: 'image-4' } }
    }
  },
  {
    _id: 'news-3',
    title: 'Prayer Novena for Peace in East Africa',
    slug: { current: 'prayer-novena-peace' },
    excerpt: 'Join our member communities in a nine-day prayer novena for peace in the region.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'All member communities will be participating in a synchronized novena prayer for peace in East Africa from August 10-18. Each day will focus on a different aspect of peace, from personal reconciliation to international harmony.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-5' } },
    publishedAt: '2023-07-30T00:00:00Z',
    categories: [
      { _id: 'cat-3', title: 'Prayer Intentions' },
      { _id: 'cat-1', title: 'Events' }
    ],
    author: {
      name: 'Sister Agnes Wanjiru',
      image: { asset: { _ref: 'image-6' } }
    }
  },
  {
    _id: 'news-4',
    title: 'New Monastery Established in Tanzania',
    slug: { current: 'new-monastery-tanzania' },
    excerpt: 'The Discalced Carmelite Nuns have established a new monastery in Mwanza, Tanzania.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'We are delighted to announce that our sisters from the Discalced Carmelite community have established a new monastery in Mwanza, Tanzania. This marks the expansion of our contemplative presence in East Africa and will serve as a spiritual oasis in the region.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-7' } },
    publishedAt: '2023-06-25T00:00:00Z',
    categories: [
      { _id: 'cat-4', title: 'Announcements' }
    ],
    author: {
      name: 'Sister Elizabeth Nyambura',
      image: { asset: { _ref: 'image-8' } }
    }
  },
  {
    _id: 'news-5',
    title: 'Spiritual Retreat for Contemplative Leaders',
    slug: { current: 'spiritual-retreat-leaders' },
    excerpt: 'A three-week spiritual retreat for community leaders will be held in Machakos in October.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'Community leaders from all member monasteries are invited to attend a three-week spiritual retreat at the Carmelite Monastery in Machakos this October. The retreat will focus on contemplative leadership and spiritual renewal.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-9' } },
    publishedAt: '2023-08-05T00:00:00Z',
    categories: [
      { _id: 'cat-1', title: 'Events' },
      { _id: 'cat-2', title: 'Formation' }
    ],
    author: {
      name: 'Sister Maria Teresa',
      image: { asset: { _ref: 'image-2' } }
    }
  },
  {
    _id: 'news-6',
    title: 'Prayer Request for Drought-Affected Communities',
    slug: { current: 'prayer-drought-communities' },
    excerpt: 'Please join us in praying for communities affected by drought in Northern Kenya.',
    body: [
      { 
        _type: 'block', 
        children: [
          { _type: 'span', text: 'Our contemplative communities are dedicating special prayers for those affected by the ongoing drought in Northern Kenya. We invite all to join us in offering intentions for rainfall, relief efforts, and the wellbeing of vulnerable populations.' }
        ] 
      }
    ],
    mainImage: { asset: { _ref: 'image-10' } },
    publishedAt: '2023-07-20T00:00:00Z',
    categories: [
      { _id: 'cat-3', title: 'Prayer Intentions' }
    ],
    author: {
      name: 'Sister Agnes Wanjiru',
      image: { asset: { _ref: 'image-6' } }
    }
  }
];

// Static list of monasteries
const monasteries = [
  {
    _id: '1',
    name: 'Discalced Carmelite Nuns - Westlands',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Nairobi' }] }],
    location: { lat: -1.2659, lng: 36.8019 },
    address: 'Westlands, Archdiocese of Nairobi',
    establishedYear: '1982',
    congregationName: 'Discalced Carmelite Nuns',
    image: { asset: { _ref: 'image-1' } }
  },
  {
    _id: '2',
    name: 'Discalced Carmelite Nuns - Tindinyo',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Eldoret' }] }],
    location: { lat: 0.5143, lng: 35.2698 },
    address: 'Tindinyo, Diocese of Eldoret',
    establishedYear: '1991',
    congregationName: 'Discalced Carmelite Nuns',
    image: { asset: { _ref: 'image-2' } }
  },
  {
    _id: '3',
    name: 'Discalced Carmelite Nuns - Zomba',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Zomba, Malawi' }] }],
    location: { lat: -15.3833, lng: 35.3333 },
    address: 'Zomba, Diocese of Zomba, Malawi',
    establishedYear: '1985',
    congregationName: 'Discalced Carmelite Nuns',
    image: { asset: { _ref: 'image-3' } }
  },
  {
    _id: '4',
    name: 'Discalced Carmelite Nuns - Mafikeng',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Kimbereley, South Africa' }] }],
    location: { lat: -25.8652, lng: 25.6442 },
    address: 'Mafikeng, Diocese of Kimbereley, South Africa',
    establishedYear: '1990',
    congregationName: 'Discalced Carmelite Nuns',
    image: { asset: { _ref: 'image-4' } }
  },
  {
    _id: '5',
    name: 'Discalced Carmelite Nuns - Manga Hills',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Kisii' }] }],
    location: { lat: -0.6748, lng: 34.7735 },
    address: 'Manga Hills, Diocese of Kisii',
    establishedYear: '1995',
    congregationName: 'Discalced Carmelite Nuns',
    image: { asset: { _ref: 'image-5' } }
  },
  {
    _id: '6',
    name: 'Carmelite Nuns of the Ancient Observance - Machakos',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Machakos' }] }],
    location: { lat: -1.5177, lng: 37.2634 },
    address: 'Machakos, Diocese of Machakos',
    establishedYear: '1993',
    congregationName: 'Carmelite Nuns of the Ancient Observance',
    image: { asset: { _ref: 'image-6' } }
  },
  {
    _id: '7',
    name: 'Carmelite Nuns of the Ancient Observance - Weirmouth',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Mutare, Zimbabwe' }] }],
    location: { lat: -18.9765, lng: 32.6505 },
    address: 'Weirmouth, Diocese of Mutare, Zimbabwe',
    establishedYear: '1988',
    congregationName: 'Carmelite Nuns of the Ancient Observance',
    image: { asset: { _ref: 'image-7' } }
  },
  {
    _id: '8',
    name: 'Carmelite Nuns of the Ancient Observance - Juja Farm',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Nairobi' }] }],
    location: { lat: -1.1018, lng: 37.0144 },
    address: 'Juja Farm, Archdiocese of Nairobi',
    establishedYear: '1986',
    congregationName: 'Carmelite Nuns of the Ancient Observance',
    image: { asset: { _ref: 'image-8' } }
  },
  {
    _id: '9',
    name: 'Carmelite Nuns of the Ancient Observance - Kitui',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Kitui' }] }],
    location: { lat: -1.3673, lng: 38.0055 },
    address: 'Kitui, Diocese of Kitui',
    establishedYear: '1997',
    congregationName: 'Carmelite Nuns of the Ancient Observance',
    image: { asset: { _ref: 'image-9' } }
  },
  {
    _id: '10',
    name: 'Augustinian Nuns - Ishiara',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Embu' }] }],
    location: { lat: -0.4788, lng: 37.7595 },
    address: 'Ishiara, Diocese of Embu',
    establishedYear: '1999',
    congregationName: 'Augustinian Nuns',
    image: { asset: { _ref: 'image-10' } }
  },
  {
    _id: '11',
    name: 'Augustinian Nuns - Kitale',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Kitale' }] }],
    location: { lat: 1.0192, lng: 35.0062 },
    address: 'Kitale, Diocese of Kitale',
    establishedYear: '2001',
    congregationName: 'Augustinian Nuns',
    image: { asset: { _ref: 'image-11' } }
  },
  {
    _id: '12',
    name: 'Augustinian Recollect Nuns - Wote',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Wote' }] }],
    location: { lat: -1.7942, lng: 37.6245 },
    address: 'Wote, Diocese of Wote',
    establishedYear: '2003',
    congregationName: 'Augustinian Recollect Nuns',
    image: { asset: { _ref: 'image-12' } }
  },
  {
    _id: '13',
    name: 'Augustinian Recollect Nuns - Nakwamekwi',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Lodwar' }] }],
    location: { lat: 3.1167, lng: 35.6000 },
    address: 'Nakwamekwi, Diocese of Lodwar',
    establishedYear: '2005',
    congregationName: 'Augustinian Recollect Nuns',
    image: { asset: { _ref: 'image-13' } }
  },
  {
    _id: '14',
    name: 'Dominican Nuns - Karen',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Nairobi' }] }],
    location: { lat: -1.3169, lng: 36.7062 },
    address: 'Karen, Archdiocese of Nairobi',
    establishedYear: '1987',
    congregationName: 'Dominican Nuns',
    image: { asset: { _ref: 'image-14' } }
  },
  {
    _id: '15',
    name: 'Dominican Nuns - Kabwe',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Kabwe, Zambia' }] }],
    location: { lat: -14.4454, lng: 28.4464 },
    address: 'Kabwe, Diocese of Kabwe, Zambia',
    establishedYear: '1992',
    congregationName: 'Dominican Nuns',
    image: { asset: { _ref: 'image-15' } }
  },
  {
    _id: '16',
    name: 'Cottolengo Contemplatives - Tuuru',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Meru' }] }],
    location: { lat: 0.0500, lng: 37.6500 },
    address: 'Tuuru, Diocese of Meru',
    establishedYear: '2000',
    congregationName: 'Cottolengo Contemplatives',
    image: { asset: { _ref: 'image-16' } }
  },
  {
    _id: '17',
    name: 'Perpetual Adorers of the Blessed Sacrament - Karima',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Nyeri' }] }],
    location: { lat: -0.4166, lng: 36.9500 },
    address: 'Karima, Archdiocese of Nyeri',
    establishedYear: '1998',
    congregationName: 'Perpetual Adorers of the Blessed Sacrament',
    image: { asset: { _ref: 'image-17' } }
  },
  {
    _id: '18',
    name: 'Poor Clare Nuns - Myanga',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Bungoma' }] }],
    location: { lat: 0.5667, lng: 34.5500 },
    address: 'Myanga, Diocese of Bungoma',
    establishedYear: '1995',
    congregationName: 'Poor Clare Nuns',
    image: { asset: { _ref: 'image-1' } }
  },
  {
    _id: '19',
    name: 'Poor Clare Colettine Nuns - Mpeketoni',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Malindi' }] }],
    location: { lat: -2.4167, lng: 40.6833 },
    address: 'Mpeketoni, Diocese of Malindi',
    establishedYear: '2002',
    congregationName: 'Poor Clare Colettine Nuns',
    image: { asset: { _ref: 'image-2' } }
  },
  {
    _id: '20',
    name: 'Sisters of the Good Shepherd Contemplatives - Ngong',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Diocese of Ngong' }] }],
    location: { lat: -1.3572, lng: 36.6700 },
    address: 'Ngong, Diocese of Ngong',
    establishedYear: '2004',
    congregationName: 'Sisters of the Good Shepherd Contemplatives',
    image: { asset: { _ref: 'image-3' } }
  },
  {
    _id: '21',
    name: 'Discalced Mercedarian Nuns - Mwatate',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Mombasa' }] }],
    location: { lat: -3.5000, lng: 38.3667 },
    address: 'Mwatate, Archdiocese of Mombasa',
    establishedYear: '2006',
    congregationName: 'Discalced Mercedarian Nuns',
    image: { asset: { _ref: 'image-4' } }
  },
  {
    _id: '22',
    name: 'Benedictine Nuns - Kiambu',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Nairobi' }] }],
    location: { lat: -1.1708, lng: 36.8333 },
    address: 'Kiambu, Archdiocese of Nairobi',
    establishedYear: '1994',
    congregationName: 'Benedictine Nuns',
    image: { asset: { _ref: 'image-5' } }
  },
  {
    _id: '23',
    name: 'Benedictine Nuns of Perpetual Adoration - Muhoroni',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Kisumu' }] }],
    location: { lat: -0.1500, lng: 35.2000 },
    address: 'Muhoroni, Archdiocese of Kisumu',
    establishedYear: '1996',
    congregationName: 'Benedictine Nuns of Perpetual Adoration',
    image: { asset: { _ref: 'image-6' } }
  },
  {
    _id: '24',
    name: 'Order of the Holy Spirit [Comendadoras] - Resurrection Garden',
    description: [{ _type: 'block', children: [{ _type: 'span', text: 'Contemplative community located in the Archdiocese of Nairobi' }] }],
    location: { lat: -1.2864, lng: 36.8172 },
    address: 'Resurrection Garden, Archdiocese of Nairobi',
    establishedYear: '2001',
    congregationName: 'Order of the Holy Spirit [Comendadoras]',
    image: { asset: { _ref: 'image-7' } }
  }
]; 
