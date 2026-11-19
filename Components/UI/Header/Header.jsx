import TopTrustBar from "@/Components/Pages/GetFreeMovingQuotePage/TopTrustBar";
import ResponsiveNavbar from "./ResponsiveNavbar/ResponsiveNavbar";
export default function Header({ localSections = false, hasServiceReviews = false, hasServiceGallery = false }) {
  return (
    <>
      <TopTrustBar />
      <ResponsiveNavbar localSections={localSections} hasServiceReviews={hasServiceReviews} hasServiceGallery={hasServiceGallery} />
      <div className="header-offset" aria-hidden="true" />
    </>
  );
}
