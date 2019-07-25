/*
Estimation of read time inspired by Nick Fisher
Link: https://blog.medium.com/read-time-and-you-bc2048ab620c
*/

export default (text) => {
  const SECONDS_PER_MINUTE = 60;
  const WORD_PER_MINUTE = 265;
  const SECONDS_PER_IMAGE = 12;
  const ADDITIONNAL_SECONDS_IMG_2 = 10;
  const ADDITIONNAL_SECONDS_IMG_3 = 2;
  const LIMIT_ONE = 1;
  const LIMIT_TWO = 2;

  // number of images in the article
  /* istanbul ignore next */
  const numberOfImages = (text.split('<img') || []).length - 1;
  // image seconds
  let totalNumberOfSeconds = 0;

  if (numberOfImages === 1) {
    // estimation of read time when the content has one image
    totalNumberOfSeconds = SECONDS_PER_IMAGE;
  }
  if (numberOfImages === LIMIT_ONE) {
    // Adult takes 10 seconds to view the second image
    totalNumberOfSeconds = SECONDS_PER_IMAGE + ADDITIONNAL_SECONDS_IMG_2;
  }
  if (numberOfImages > LIMIT_TWO) {
    // every additional image take 2sec
    totalNumberOfSeconds += [numberOfImages * ADDITIONNAL_SECONDS_IMG_3];
  }

  const numberOfWords = text.split(' ').length; // calculate number of words

  // calculate seconds you can read the text
  const totalSecondsForAllTheWords = numberOfWords * (SECONDS_PER_MINUTE / WORD_PER_MINUTE);

  const totalMinutes = (totalSecondsForAllTheWords + totalNumberOfSeconds) / SECONDS_PER_MINUTE;
  return Math.round(totalMinutes);
};
