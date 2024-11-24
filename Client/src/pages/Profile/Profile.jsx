import Header from "../../components/Header/Header";
import PasswordUpdateForm from "../../components/PasswordUpdateForm/PasswordUpdateForm";
import ProfileInformation from "../../components/ProfileInformationUpdate/ProfileInformationUpdate";

function Profile() {
  return (
    <div>
      <Header />
      <ProfileInformation />
      <PasswordUpdateForm />
    </div>
  );
}

export default Profile;
