import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

import enAboutPage from "../messages/en/aboutPage.json";
import enAdmissionPage from "../messages/en/admissionPage.json";
import enAdmissionWizard from "../messages/en/admissionWizard.json";
import enAnnouncementBanner from "../messages/en/announcementBanner.json";
import enContactDetails from "../messages/en/contactDetails.json";
import enContactForm from "../messages/en/contactForm.json";
import enContactPage from "../messages/en/contactPage.json";
import enFacilitiesPage from "../messages/en/facilitiesPage.json";
import enFaqPage from "../messages/en/faqPage.json";
import enFacultyPage from "../messages/en/facultyPage.json";
import enGalleryPage from "../messages/en/galleryPage.json";
import enNewsPage from "../messages/en/newsPage.json";
import enPlacementsPage from "../messages/en/placementsPage.json";
import enVerifyPage from "../messages/en/verifyPage.json";
import enCourseGrid from "../messages/en/courseGrid.json";
import enCourseInquiryForm from "../messages/en/courseInquiryForm.json";
import enEnquirePage from "../messages/en/enquirePage.json";
import enCoursesPage from "../messages/en/coursesPage.json";
import enCourseDetailPage from "../messages/en/courseDetailPage.json";
import enDirectorMessage from "../messages/en/directorMessage.json";
import enFeaturedCourses from "../messages/en/featuredCourses.json";
import enFooter from "../messages/en/footer.json";
import enHero from "../messages/en/hero.json";
import enHowToEnroll from "../messages/en/howToEnroll.json";
import enLogoBar from "../messages/en/logoBar.json";
import enNav from "../messages/en/nav.json";
import enProspectusSection from "../messages/en/prospectusSection.json";
import enQuickAccessGrid from "../messages/en/quickAccessGrid.json";
import enQuickInquiry from "../messages/en/quickInquiry.json";
import enQuickResourceLinks from "../messages/en/quickResourceLinks.json";
import enStatsSection from "../messages/en/statsSection.json";
import enWhyChooseUs from "../messages/en/whyChooseUs.json";

import mrAboutPage from "../messages/mr/aboutPage.json";
import mrAdmissionPage from "../messages/mr/admissionPage.json";
import mrAdmissionWizard from "../messages/mr/admissionWizard.json";
import mrAnnouncementBanner from "../messages/mr/announcementBanner.json";
import mrContactDetails from "../messages/mr/contactDetails.json";
import mrContactForm from "../messages/mr/contactForm.json";
import mrContactPage from "../messages/mr/contactPage.json";
import mrFacilitiesPage from "../messages/mr/facilitiesPage.json";
import mrFaqPage from "../messages/mr/faqPage.json";
import mrFacultyPage from "../messages/mr/facultyPage.json";
import mrGalleryPage from "../messages/mr/galleryPage.json";
import mrNewsPage from "../messages/mr/newsPage.json";
import mrPlacementsPage from "../messages/mr/placementsPage.json";
import mrVerifyPage from "../messages/mr/verifyPage.json";
import mrCourseGrid from "../messages/mr/courseGrid.json";
import mrCourseInquiryForm from "../messages/mr/courseInquiryForm.json";
import mrEnquirePage from "../messages/mr/enquirePage.json";
import mrCoursesPage from "../messages/mr/coursesPage.json";
import mrCourseDetailPage from "../messages/mr/courseDetailPage.json";
import mrDirectorMessage from "../messages/mr/directorMessage.json";
import mrFeaturedCourses from "../messages/mr/featuredCourses.json";
import mrFooter from "../messages/mr/footer.json";
import mrHero from "../messages/mr/hero.json";
import mrHowToEnroll from "../messages/mr/howToEnroll.json";
import mrLogoBar from "../messages/mr/logoBar.json";
import mrNav from "../messages/mr/nav.json";
import mrProspectusSection from "../messages/mr/prospectusSection.json";
import mrQuickAccessGrid from "../messages/mr/quickAccessGrid.json";
import mrQuickInquiry from "../messages/mr/quickInquiry.json";
import mrQuickResourceLinks from "../messages/mr/quickResourceLinks.json";
import mrStatsSection from "../messages/mr/statsSection.json";
import mrWhyChooseUs from "../messages/mr/whyChooseUs.json";

export const locales = ["en", "mr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeCookieName = "NEXT_LOCALE";

// Each namespace lives in its own file under src/messages/{locale}/<namespace>.json
// so a single page/section can be handed to a translator independently.
const en = {
  aboutPage: enAboutPage,
  admissionPage: enAdmissionPage,
  admissionWizard: enAdmissionWizard,
  announcementBanner: enAnnouncementBanner,
  contactDetails: enContactDetails,
  contactForm: enContactForm,
  contactPage: enContactPage,
  facilitiesPage: enFacilitiesPage,
  faqPage: enFaqPage,
  facultyPage: enFacultyPage,
  galleryPage: enGalleryPage,
  newsPage: enNewsPage,
  placementsPage: enPlacementsPage,
  verifyPage: enVerifyPage,
  courseGrid: enCourseGrid,
  courseInquiryForm: enCourseInquiryForm,
  enquirePage: enEnquirePage,
  coursesPage: enCoursesPage,
  courseDetailPage: enCourseDetailPage,
  directorMessage: enDirectorMessage,
  featuredCourses: enFeaturedCourses,
  footer: enFooter,
  hero: enHero,
  howToEnroll: enHowToEnroll,
  logoBar: enLogoBar,
  nav: enNav,
  prospectusSection: enProspectusSection,
  quickAccessGrid: enQuickAccessGrid,
  quickInquiry: enQuickInquiry,
  quickResourceLinks: enQuickResourceLinks,
  statsSection: enStatsSection,
  whyChooseUs: enWhyChooseUs,
};

const mr = {
  aboutPage: mrAboutPage,
  admissionPage: mrAdmissionPage,
  admissionWizard: mrAdmissionWizard,
  announcementBanner: mrAnnouncementBanner,
  contactDetails: mrContactDetails,
  contactForm: mrContactForm,
  contactPage: mrContactPage,
  facilitiesPage: mrFacilitiesPage,
  faqPage: mrFaqPage,
  facultyPage: mrFacultyPage,
  galleryPage: mrGalleryPage,
  newsPage: mrNewsPage,
  placementsPage: mrPlacementsPage,
  verifyPage: mrVerifyPage,
  courseGrid: mrCourseGrid,
  courseInquiryForm: mrCourseInquiryForm,
  enquirePage: mrEnquirePage,
  coursesPage: mrCoursesPage,
  courseDetailPage: mrCourseDetailPage,
  directorMessage: mrDirectorMessage,
  featuredCourses: mrFeaturedCourses,
  footer: mrFooter,
  hero: mrHero,
  howToEnroll: mrHowToEnroll,
  logoBar: mrLogoBar,
  nav: mrNav,
  prospectusSection: mrProspectusSection,
  quickAccessGrid: mrQuickAccessGrid,
  quickInquiry: mrQuickInquiry,
  quickResourceLinks: mrQuickResourceLinks,
  statsSection: mrStatsSection,
  whyChooseUs: mrWhyChooseUs,
};

type MessageValue = string | string[] | MessageTree;
type MessageTree = { [key: string]: MessageValue };

// Marathi strings the user hasn't filled in yet are empty ("") — for those,
// keep showing the English value instead of a blank string. Arrays (e.g.
// bullet-point lists) are merged item-by-item with the same fallback rule.
function mergeWithEnglishFallback(base: MessageTree, overlay: MessageTree | undefined): MessageTree {
  const result: MessageTree = {};
  for (const key of Object.keys(base)) {
    const baseValue = base[key];
    const overlayValue = overlay?.[key];
    if (typeof baseValue === "string") {
      result[key] = typeof overlayValue === "string" && overlayValue.trim() !== "" ? overlayValue : baseValue;
    } else if (Array.isArray(baseValue)) {
      const overlayArray = Array.isArray(overlayValue) ? overlayValue : undefined;
      result[key] = baseValue.map((item, i) => {
        const overlayItem = overlayArray?.[i];
        return typeof overlayItem === "string" && overlayItem.trim() !== "" ? overlayItem : item;
      });
    } else {
      result[key] = mergeWithEnglishFallback(baseValue, overlayValue as MessageTree | undefined);
    }
  }
  return result;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;
  const locale: Locale = (locales as readonly string[]).includes(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const messages = locale === "mr" ? mergeWithEnglishFallback(en, mr) : en;

  return { locale, messages };
});
