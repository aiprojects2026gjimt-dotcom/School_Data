'use strict';
// Mirrors the five parts of the supplied GJIMT paper form.
const MANUAL_PARTS=[
['PART 1: GENERAL & ACADEMIC INFORMATION',[
['studentName','Student Name','text'],['currentClass','Current Class','one',['Class 11th','Class 12th']],['schoolName','School Name','school'],['schoolCity','School City / Location','text'],['stream','Stream','one',['Medical','Non-Med','Comm','Arts']],['percentage11','11th Class (%)','number'],['guardianName',"Father’s / Guardian’s Name",'text'],['parentPhone',"Parent’s Contact No",'tel'],['studentPhone','Student Mobile No','tel'],['whatsapp','WhatsApp No (if different)','tel'],['email','Email ID','email'],['category','Category','one',['Gen','SC','OBC','ST','Other']],['residentialCity','Residential Town / City','text'],['preferredContact','Preferred Contact','one',['WhatsApp','Call','SMS']]]],
['PART 2: CAREER ASPIRATIONS & FUTURE PLANS',[
['careerDomain','1. Which stream / domain do you plan to pursue after 12th?','many',['Management / Commerce (BBA / B.Com)','IT / AI & Computer Applications (BCA)','Engineering (B.Tech)','Medical / Healthcare Allied','Design / Media / Mass Comm','Other']],['entranceExam','2. Are you preparing for or appearing in any competitive entrance examination?','many',['JEE / State CET','CUET','NEET','CLAT / Law','NDA / Defense','Direct Admission']],['studyAbroad','3. Are you looking forward to studying abroad?','one',['Yes, after Class 12th','Yes, after Graduation','No, looking for reputed colleges in India']],['counselingInterest','4. Would you like to receive 1-on-1 career guidance and counseling from GJIMT expert mentors?','one',['Yes, definitely','Maybe later','No']]]],
["PART 3: SPECIAL INITIATIVE — GJIMT SkillX ‘ZERO TO HERO’ HANDS-ON WORKSHOPS",[
['skillxInterest','Are you interested in attending GJIMT SkillX Hands-on Skill Building Workshops? (AI & Future Tech)','one',['Yes, I am definitely interested!','Maybe, want more details','No']],['preferredSlot','Preferred Slot','one',['11:00 AM – 1:00 PM','3:00 PM – 5:00 PM']],['preferredDates','Preferred Dates','text']]],
['PART 4: INSTITUTION SELECTION FACTORS',[
['selectionFactors','What top 3 factors matter most to you when choosing a higher education institution? (Tick top 3)','many',['100% Placement Support & Top MNCs','AI & Practical Skill-Based Curriculum','Scholarship / Affordable Fee','Experienced Faculty Mentorship','Global Immersion & Exchange Pathways','Modern Campus, Labs & Clubs']],['careerQuery','Any specific career query or guidance you would like our experts to address?','textarea']]],
['PART 5: STUDENT CONSENT & DECLARATION',[
['consent','I hereby give my consent to GJIMT, Mohali to contact me regarding career counseling, scholarship opportunities, workshops, and admission guidance via SMS, WhatsApp, Call, and Email.','consent'],['signaturePresent','Student Signature','one',['Yes','No']],['formDate','Date','date']]]
];
const manualRoot=document.getElementById('manualFields');
const PHONE_FIELDS=new Set(['parentPhone','studentPhone','whatsapp']);
const NAME_FIELDS=new Set(['studentName','guardianName','counselorName']);
function addRequiredMark(el){const star=document.createElement('span');star.className='required-star';star.textContent=' *';star.setAttribute('aria-label','required');el.appendChild(star);}
function setValidation(el,key){
 el.required=true;
 if(PHONE_FIELDS.has(key)){el.type='tel';el.inputMode='numeric';el.maxLength=10;el.minLength=10;el.pattern='[6-9][0-9]{9}';el.title='Enter a valid 10-digit Indian mobile number, beginning with 6, 7, 8 or 9.';el.addEventListener('input',()=>{el.value=el.value.replace(/\D/g,'').slice(0,10);});}
 else if(NAME_FIELDS.has(key)){el.minLength=2;el.maxLength=100;el.pattern="[A-Za-z\u00C0-\u024F\u0900-\u097F .'-]{2,100}";el.title='Use letters, spaces, apostrophes, hyphens or periods (minimum 2 characters).';}
 else if(key==='email'){el.type='email';el.maxLength=160;el.title='Enter a valid email address.';}
 else if(key==='percentage11'){el.min='0';el.max='100';el.step='0.01';}
 else if(el.type==='text' || el.tagName==='TEXTAREA'){el.maxLength=500;}
}

const topBlock=document.createElement('div');topBlock.className='manual-meta';
const counselor=document.createElement('label');counselor.textContent='Counselor Name *';const counselorInput=document.createElement('input');counselorInput.name='counselorName';setValidation(counselorInput,'counselorName');counselor.appendChild(counselorInput);topBlock.appendChild(counselor);manualRoot.appendChild(topBlock);
for(const [heading,items] of MANUAL_PARTS){const section=document.createElement('section');section.className='manual-section';const h=document.createElement('h2');h.textContent=heading;section.appendChild(h);const grid=document.createElement('div');grid.className='manual-grid';section.appendChild(grid);for(const [key,label,type,options] of items){const field=document.createElement('div');field.className='manual-field';const title=document.createElement('div');title.className='manual-label';title.textContent=label;addRequiredMark(title);field.appendChild(title);if(type==='one'||type==='many'){const group=document.createElement('div');group.className='manual-choices';for(const opt of options){const item=document.createElement('label');item.className='manual-choice';const input=document.createElement('input');input.type=type==='one'?'radio':'checkbox';input.name=key;input.value=opt;if(type==='one')input.required=true;item.append(input,document.createTextNode(opt));group.appendChild(item);}field.appendChild(group);}else if(type==='textarea'){const area=document.createElement('textarea');area.name=key;area.rows=3;setValidation(area,key);field.appendChild(area);}else if(type==='consent'){const chk=document.createElement('input');chk.type='checkbox';chk.name=key;chk.value='Yes';chk.required=true;field.prepend(chk);}else if(type==='school'){const select=document.createElement('select');select.name=key;select.id='manualSchool';select.required=true;field.appendChild(select);const addRow=document.createElement('div');addRow.className='manual-school-add';const newInput=document.createElement('input');newInput.id='manualNewSchool';newInput.type='text';newInput.placeholder='Enter new school name';newInput.autocomplete='off';const addButton=document.createElement('button');addButton.type='button';addButton.id='manualAddSchool';addButton.className='secondary';addButton.textContent='+ Add School';addRow.append(newInput,addButton);field.appendChild(addRow);const note=document.createElement('small');note.id='manualSchoolStatus';note.setAttribute('role','status');note.textContent='Choose a school above, or enter a new school and click Add School.';field.appendChild(note);}else{const input=document.createElement('input');input.type=type;input.name=key;setValidation(input,key);if(type==='number'){input.min='0';input.max='100';input.step='0.01';}field.appendChild(input);}if(type==='one'||type==='many'){field.dataset.choiceType=type;field.dataset.fieldKey=key;}grid.appendChild(field);}manualRoot.appendChild(section);}
function refreshManualSchools(){const el=document.getElementById('manualSchool');const selected=el.value;el.replaceChildren(new Option('Select school',''));for(const s of [...new Set([...state.schools,...state.records.map(r=>r.schoolName)].filter(Boolean))].sort((a,b)=>a.localeCompare(b)))el.add(new Option(s,s));if([...el.options].some(o=>o.value===selected))el.value=selected;}
document.getElementById('manualAddSchool').addEventListener('click',async()=>{
 const input=document.getElementById('manualNewSchool');
 const name=input.value.trim();
 const message=document.getElementById('manualSchoolStatus');
 const button=document.getElementById('manualAddSchool');
 if(name.length<3){message.textContent='Enter a school name with at least 3 characters.';return;}
 if(state.busy){message.textContent='Please wait for the current operation to finish.';return;}
 try{
  state.busy=true;button.disabled=true;message.textContent='Adding school…';
  const result=await post('addSchool',{schoolName:name});
  state.schools=result.schools||[];
  renderSchoolOptions();refreshManualSchools();
  const school=result.schoolName||name;
  if(![...document.getElementById('manualSchool').options].some(o=>o.value===school))document.getElementById('manualSchool').add(new Option(school,school));
  document.getElementById('manualSchool').value=school;
  input.value='';message.textContent='School added and selected: '+school;gjimtNotify('School added: '+school,'success');
 }catch(e){message.textContent='Could not add school: '+e.message;gjimtNotify('Could not add school: '+e.message,'error');}
 finally{state.busy=false;button.disabled=false;}
});
function validateManualForm(form){
 form.querySelectorAll('.manual-field').forEach(field=>field.classList.remove('invalid-field'));
 const errors=[];
 for(const field of form.querySelectorAll('.manual-field')){
  const key=field.dataset.fieldKey;
  if(key && !field.querySelector('input:checked')){
   // Multiple choice fields must have at least one selection.
   field.classList.add('invalid-field');
   errors.push(field.querySelector('.manual-label')?.textContent.trim()||key);
  }
 }
 for(const el of form.querySelectorAll('input,select,textarea')){
  if(el.id==='manualNewSchool')continue;
  if(el.type==='radio'||el.type==='checkbox')continue;
  if(el.required && !String(el.value).trim()){el.setCustomValidity('This field is required.');}
  else el.setCustomValidity('');
  if(!el.checkValidity()){errors.push(el.closest('.manual-field')?.querySelector('.manual-label')?.textContent.trim()||el.name||'Counselor Name');el.closest('.manual-field')?.classList.add('invalid-field');}
 }
 if(errors.length){const unique=[...new Set(errors)];gjimtNotify('Please complete/correct: '+unique.slice(0,4).join(', ')+(unique.length>4?' and '+(unique.length-4)+' more fields':''),'error',7000);const first=form.querySelector('.invalid-field input,.invalid-field select,.invalid-field textarea')||form.querySelector(':invalid');first?.scrollIntoView({behavior:'smooth',block:'center'});first?.focus({preventScroll:true});return false;}
 if(!form.reportValidity())return false;
 const email=form.elements.namedItem('email');if(email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())){email.setCustomValidity('Enter a valid email address.');email.reportValidity();email.setCustomValidity('');return false;}
 return true;
}
formSetup();
function formSetup(){const form=document.getElementById('manualForm');form.noValidate=true;form.addEventListener('input',e=>{if(e.target.setCustomValidity)e.target.setCustomValidity('');e.target.closest('.manual-field')?.classList.remove('invalid-field');});form.addEventListener('change',e=>e.target.closest('.manual-field')?.classList.remove('invalid-field'));}
document.getElementById('manualForm').addEventListener('submit',async ev=>{ev.preventDefault();if(state.busy)return;const form=ev.currentTarget;if(!validateManualForm(form))return;const record={entryMethod:'Manual'};for(const [key,value] of new FormData(form).entries()){if(record[key]&&key!=='entryMethod')record[key]+='; '+value;else record[key]=value;}if(!record.schoolName||!record.studentName?.trim()||!record.counselorName?.trim()){alert('Student name, school, and counselor name are required.');return;}const factors=String(record.selectionFactors||'').split('; ').filter(Boolean);if(factors.length>3){alert('Select at most three institution factors.');return;}if(!confirm('Save this manually entered student record to Google Sheets?'))return;const btn=document.getElementById('manualSaveBtn');const message=document.getElementById('manualStatus');try{state.busy=true;btn.disabled=true;message.textContent='Saving student record…';await post('save',{record,fileUrl:'',filename:'Manual entry'});form.reset();message.textContent='Student record saved successfully.';gjimtNotify('Manual student record saved to Google Sheets.','success');await loadRecords(true);refreshManualSchools();}catch(e){message.textContent='Save failed: '+e.message;gjimtNotify('Save failed: '+e.message,'error',7000);}finally{state.busy=false;btn.disabled=false;}});
