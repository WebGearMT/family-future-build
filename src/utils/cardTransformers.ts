import { GenericPostData } from "@/components/cards/GenericPostCard";
import {
  ReputableAgent,
  ReputableCompany,
  ClassifiedAd,
  ServiceProvider,
  TipsTrick
} from "@/hooks/useNoticeBoards";

// Transform ServiceProvider to GenericPostData for card display
export const transformServiceProviderToCard = (provider: ServiceProvider): GenericPostData => ({
  id: provider.id,
  title: provider.job_title,
  subtitle: provider.company_name,
  description: provider.job_description,
  location: provider.location,
  category: provider.job_type,
  metadata: {
    'salary range': provider.salary_range,
    'posted': new Date(provider.posted_date).toLocaleDateString()
  }
});

// Transform ClassifiedAd to GenericPostData for card display
export const transformClassifiedAdToCard = (ad: ClassifiedAd): GenericPostData => ({
  id: ad.id,
  title: ad.title,
  subtitle: `Sold by ${ad.seller_name}`,
  description: ad.description,
  price: ad.price,
  location: ad.location,
  category: ad.category,
  metadata: {
    'condition': ad.condition,
    'posted': new Date(ad.posted_date).toLocaleDateString()
  }
});

// Transform ReputableAgent to GenericPostData for card display
export const transformReputableAgentToCard = (agent: ReputableAgent): GenericPostData => ({
  id: agent.id,
  title: agent.name,
  subtitle: agent.specialization,
  description: agent.description,
  rating: agent.rating,
  location: agent.location,
  metadata: {
    'experience': `${agent.experience_years} years`,
    'contact': agent.contact_email
  }
});

// Transform ReputableCompany to GenericPostData for card display
export const transformReputableCompanyToCard = (company: ReputableCompany): GenericPostData => ({
  id: company.id,
  title: company.company_name,
  subtitle: company.industry,
  description: company.description,
  rating: company.rating,
  location: company.location,
  category: company.industry,
  metadata: {
    'website': company.website,
    'contact': company.contact_email
  }
});

// Transform TipsTrick to GenericPostData for card display
export const transformTipsTrickToCard = (tip: TipsTrick): GenericPostData => ({
  id: tip.id,
  title: tip.title,
  subtitle: `By ${tip.author}`,
  description: tip.content,
  category: tip.category,
  metadata: {
    'posted': new Date(tip.posted_date).toLocaleDateString(),
    'tags': tip.tags
  }
});
