import CheckoutSummaryPage from "../../components/Checkout/Checkout";
import Header from "../../components/Header/Header";
import PasswordUpdateForm from "../../components/PasswordUpdateForm/PasswordUpdateForm";
import ProfileInformation from "../../components/ProfileInformationUpdate/ProfileInformationUpdate";

function Profile() {
  return (
    <div>
      <Header />
      <CheckoutSummaryPage />
      <ProfileInformation />
      <PasswordUpdateForm />
    </div>
  );
}

export default Profile;
