export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('TermsAndConditions',
    [
      {
        termsAndConditions: `Author's Haven Terms and conditions
        These terms  of conditions between you and Authors haven They govern your use of Authors haven   web services.
        By using Authors haven you agree to these terms and conditions If you dont agree,  there is no other way to use the authors haven services

        We can change these Terms and condition anytime .We will keep you updated with the updated document on site. We highly recommend that you check the terms and conditions document regularly.  if you don’t agree with the new terms and conditions .You should delete your account before they take effect, otherwise your use of the site and content will be subjected to the new terms and conditions.

        Content rights and responsibilities
         Right  on the content created on Author’s Haven.

         The content posted on Authors haven ,The author have non exclusive license to publish it on Authors haven.Including anything reasonably related to publishing it like storing, displaying, reformatting, and distributing it.In consideration for Author’s haven granting you access you agree that  ,Author;s haven may use your content to promote Author’s haven products.However Author’s haven will never sell your content to third parties without your permission.

        Responsibilities  on the contents created on Author’s Haven

        You’re responsible for the content you post. This means you assume all risks related to it, including someone else’s reliance on its accuracy, or claims relating to intellectual property or other legal rights.

        You’re allowed  to post content on Authors Haven that you have published elsewhere, as long as you have the rights you need to do so. By posting content to Authors Haven, you represent that doing so does not conflict with any other agreement you have made.

         What  Authors haven  can do without   your approval .

        We may change, terminate, or restrict access to any aspect of the service, at any time, without notice.
        You can delete any of your posts, or your account, anytime. We may keep backup copies of your deleted post or account  to  verify if there is nothing illegal in the deleted contents.
        We can remove any content you post for any reason.

        Security
        If you find a security vulnerability on Author’s Haven, Please let us know to be able to fix it.Do not use that vulnerability to breach into our system.
         Limitation of Liability.
        Author’s Haven won’t be liable to you for any damages that arise from your using the Services. This includes if the Services are hacked or unavailable. This includes all types of damages (indirect, incidental, consequential, special or exemplary). And it includes all kinds of legal claims, such as breach of contract, breach of warranty, tort, or any other loss.

        Severability.
        If any provision of these terms is found invalid by a court of competent jurisdiction, you agree that the court should try to give effect to the parties’ intentions as reflected in the provision and that other provisions of the Terms will remain in full effect.

        Entire agreement.
         These Terms and conditions  are the whole agreement between Author’s Haven and you concerning the Services.`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TermsAndConditions', null, {})
};
