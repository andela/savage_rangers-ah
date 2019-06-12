import generateLink from '../../tokens/generate.link';

export default (userData) => {
  const link = generateLink(userData.link, {
    email: userData.email,
  });
  const html = `<div style="background: #F5F4F4; padding: 3%; ">
                Hello ${userData.userName}!!<br><br>
                
                You are recieving this email beacause you've requested the recovery of your Authors Heaven password. Kindly click the button bellow.<br><br>
                <div style="text-align: center; padding: 2%;"><a target="_blank" style="background: #2F3640; color: white; text-decoration: none;
                padding: 2% 10% 2% 10%; margin-top: 1%; " href="${link}" onMouseOver="this.style.background='#586170'; this.style.color='white'"
                onMouseOut="this.style.color='white'; this.style.background='#2F3640';">RESET</a><br><br></div>
                If it doesn't 
                work, click this link <a target="_blank" onMouseOver="this.style.color='red'" onMouseOut="this.style.color='blue'" href="${link}">${link}</a>
                </div>`;
  return html;
};
