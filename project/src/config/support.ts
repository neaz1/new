// Contact information
export const contactInfo = {
  address: {
    street: 'شەقامی ١٠٠ مەتری',
    city: 'هەولێر', 
    region: 'هەرێمی کوردستان',
  },
  hours: '١٧:٠٠ - ٩:٠٠',
  phones: [
    '٠٧٥٠ ١٢٣ ٤٥٦٧',
    '٠٧٧٠ ١٢٣ ٤٥٦٧'
  ],
  email: 'info@delivery.com',
  website: 'www.delivery.com'
};

// FAQ array - add your questions here
export const faqs: Array<{
  id: string;
  question: string;
  answer: string;
  isActive?: boolean;
}> = [];

// Social media links
export const socialMedia = [
  {
    id: 'facebook',
    name: 'Facebook',
    url: 'https://facebook.com/delivery',
    icon: 'facebook',
    isActive: true
  },
  {
    id: 'instagram',
    name: 'Instagram', 
    url: 'https://instagram.com/delivery',
    icon: 'instagram',
    isActive: true
  },
  {
    id: 'youtube',
    name: 'Youtube',
    url: 'https://youtube.com/delivery',
    icon: 'youtube',
    isActive: true
  }
];

// Function to update contact info
export const updateContactInfo = (newInfo: Partial<typeof contactInfo>) => {
  Object.assign(contactInfo, newInfo);
};

// Function to add new FAQ
export const addFaq = (question: string, answer: string) => {
  const id = `faq-${Date.now()}`;
  faqs.push({ id, question, answer, isActive: true });
};

// Function to update FAQ
export const updateFaq = (id: string, updates: Partial<typeof faqs[0]>) => {
  const faqIndex = faqs.findIndex(faq => faq.id === id);
  if (faqIndex !== -1) {
    faqs[faqIndex] = { ...faqs[faqIndex], ...updates };
  }
};

// Function to delete FAQ
export const deleteFaq = (id: string) => {
  const faqIndex = faqs.findIndex(faq => faq.id === id);
  if (faqIndex !== -1) {
    faqs.splice(faqIndex, 1);
  }
};

// Function to update social media
export const updateSocialMedia = (id: string, updates: Partial<typeof socialMedia[0]>) => {
  const mediaIndex = socialMedia.findIndex(media => media.id === id);
  if (mediaIndex !== -1) {
    socialMedia[mediaIndex] = { ...socialMedia[mediaIndex], ...updates };
  }
};