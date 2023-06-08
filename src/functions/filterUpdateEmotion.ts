import { diaryTag, tag } from '../types/data/type';

export const filterUpdateEmotion = (
  existingEmotion: diaryTag[] | undefined,
  updateEmotion: tag[]
) => {
  if (existingEmotion === undefined) return;
  const existingArray = existingEmotion.map((tag) => {
    return tag.tagSeq;
  });
  const updatingArray = updateEmotion.map((tag) => {
    return tag.seq;
  });
  const mixedArray = existingArray.concat(updatingArray);
  const filteredArray = mixedArray
    .map((seq) => {
      if (existingArray.includes(seq) && !updatingArray.includes(seq)) {
        return { seq: seq, type: 'D' };
      } else if (!existingArray.includes(seq) && updatingArray.includes(seq)) {
        return { tagSeq: seq };
      }
    })
    .filter((data) => {
      return data !== undefined;
    });
  return filteredArray;
};
