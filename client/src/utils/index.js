import FileSaver from 'file-saver';
import { surpriseMePrompts } from '../constants';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export const languages = [
  {
    language:'Chinese',
    code:'zh'
  },
  {
    language:'Spanish',
    code:'es'
  },
  {
    language:'English',
    code:'en'
  },
  {
    language:'Hindi',
    code:'hi'
  },
  {
    language:'Arabic',
    code:'ar'
  },
  {
    language:'Portuguese',
    code:'pt'
  },
  {
    language:'Russian',
    code:'ru'
  },{
    language:'Japanese',
    code:'ja'
  },
  {
    language:'Punjabi',
    code:'pa'
  },
  {
    language:'German',
    code:'de'
  },
  {
    language:'Italian',
    code:'it'
  },
  {
    language:'French',
    code:'fr'
  },
  {
    language:'Korean',
    code:'ko'
  },
]