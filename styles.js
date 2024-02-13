const sheet = new CSSStyleSheet();

sheet.replaceSync(
  " button { width: 150px; padding: 12px 0; border: none; border-radius: 30px; font-family: 'Roboto', sans-serif; font-size: 20px;font-weight: 300; color: #555;}"
);
const toDo = new CSSStyleSheet();

toDo.replaceSync(
  " svg { fill: white; width: 20px;}div { width: 25px; height: 25px;border: 2px solid #abea6e; border-radius: 50%;display: flex;align-items: center;justify-content: center;}  slot {font-size: 18px; font-weight: 300;}label {display: flex; align-items: center; gap: 20px; font-family: 'Roboto', sans-serif;color: #555;}"
);
