import { useState, useEffect } from "react";
import FaqQuestion from "@/components/ui/faqQuestion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircleQuestion, MessageSquareQuote, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/ui/app-header";
import CategoryFilter from "@/components/ui/category-filter";

// Main FAQ Component
const FAQ = () => {
  const navigate = useNavigate();

  // TypeScript interfaces
  interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
  }

  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dynamicFaqs, setDynamicFaqs] = useState<FAQItem[]>([]);

  // Fetch FAQ data from database
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await fetch("/server/api.php?action=get_faq_data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.faqs)) {
            setDynamicFaqs(data.faqs);
          }
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchFaqData();
  }, []);

  // FAQ data
  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I create a new account?",
      answer:
        "To create a new account, click on the 'Sign Up' button on the login page. Fill in your email address and create a secure password that meets our requirements:\n\n• At least 8 characters long\n• Contains at least one uppercase letter\n• Contains at least one lowercase letter\n• Contains at least one number\n• Contains at least one special character\n\nOnce you've completed the form, click 'Create Account' and you'll be ready to start using the platform.",
      category: "Account",
    },
    {
      id: 2,
      question: "What are the password requirements?",
      answer:
        "Our password requirements are designed to keep your account secure:\n\n• Minimum 8 characters in length\n• At least one uppercase letter (A-Z)\n• At least one lowercase letter (a-z)\n• At least one number (0-9)\n• At least one special character (!@#$%^&*)\n\nWe recommend using a unique password that you don't use for other accounts. Consider using a password manager to generate and store strong passwords.",
      category: "Security",
    },
    {
      id: 3,
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, you can reset it by following these steps:\n\n1. Go to the login page\n2. Click on 'Forgot Password' link\n3. Enter your email address\n4. Check your email for a password reset link\n5. Click the link and create a new password\n6. Log in with your new password\n\nIf you don't receive the email within 5 minutes, check your spam folder or contact support.",
      category: "Account",
    },
    {
      id: 4,
      question: "Why was my account locked?",
      answer:
        "Your account may be locked for several reasons:\n\n• Multiple failed login attempts\n• Suspicious activity detected\n• Violation of our terms of service\n• Security maintenance\n\nIf your account is locked due to failed login attempts, it will automatically unlock after 30 minutes. For other reasons, please contact our support team who can help you regain access to your account.",
      category: "Security",
    },
    {
      id: 5,
      question: "How do I update my profile information?",
      answer:
        "To update your profile information:\n\n1. Log in to your account\n2. Click on your profile icon in the top right corner\n3. Select 'Profile Settings' from the dropdown menu\n4. Update any information you'd like to change\n5. Click 'Save Changes' to confirm your updates\n\nYou can update your name, email address, and other personal information from this section.",
      category: "Account",
    },
    {
      id: 6,
      question: "What browsers are supported?",
      answer:
        "Our platform works best with modern browsers that support the latest web standards:\n\n• Chrome (version 80 or later)\n• Firefox (version 75 or later)\n• Safari (version 13 or later)\n• Edge (version 80 or later)\n\nFor the best experience, we recommend keeping your browser updated to the latest version. Some features may not work properly in older browsers.",
      category: "Technical",
    },
    {
      id: 7,
      question: "How do I contact support?",
      answer:
        "We're here to help! You can reach our support team through several channels:\n\n• Email: support@example.com\n• Live chat: Click the chat icon in the bottom right corner\n• Phone: 1-800-SUPPORT (Mon-Fri, 9AM-6PM EST)\n• Help Center: Browse our comprehensive documentation\n\nFor the fastest response, we recommend using the live chat feature during business hours or emailing us with a detailed description of your issue.",
      category: "Support",
    },
    {
      id: 8,
      question: "Is my data secure?",
      answer:
        "Yes, we take data security very seriously. Here's how we protect your information:\n\n• All data is encrypted in transit and at rest\n• We use secure authentication methods\n• Regular security audits and updates\n• Compliance with industry standards (SOC 2, GDPR)\n• Limited access to data on a need-to-know basis\n• Regular backups to prevent data loss\n\nWe never share your personal information with third parties without your explicit consent, except as required by law.",
      category: "Security",
    },
  ];

  // Get unique categories for filter dropdown
  const categories = ["all", ...new Set(faqs.map((faq) => faq.category))];

  // Filter FAQs based on search and category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle accordion toggle
  const handleToggle = (id: number): void => {
    setOpenQuestion(openQuestion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <AppHeader mode="simple" showMenu={false} showNavButtons={false} />
      <div className="bg-transparent shadow-sm border-b border-none">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about our platform. Can't find
              what you're looking for? Contact our support team for personalized
              assistance.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>
          </div>
        </div>

        {/* FAQ Questions */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FaqQuestion
                key={faq.id}
                faq={faq}
                isOpen={openQuestion === faq.id}
                onToggle={handleToggle}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <div className="text-gray-500 mb-4">
                <svg
                  className="w-12 h-12 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.228 9c.549-1.3 2.17-2.2 4.472-2.2 3.3 0 5.3 1.8 5.3 4.2 0 2.5-3.6 4.3-3.6 6.6 0 1.3.3 2.6.3 2.6M9 16v2m6-2v2"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                No questions found matching your search.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          )}
        </div>

        {/* Community Chat Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Join our community chat to get help from other users and share your
            experiences.
          </p>
          <Link
            to=""
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Join Community Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
