function show(id){
 document.querySelectorAll('.screen').forEach(x=>x.classList.remove('active'));
 document.getElementById(id).classList.add('active');
 scrollTo(0,0);
 if(id==='dashboard')refreshDash()
}

function createAccount(){
 const e=document.getElementById('createEmail').value.trim(),
       p=document.getElementById('createPass').value,
       c=document.getElementById('confirmPass').value;

 if(!e||!p||p!==c){
  alert('Enter a valid email and matching passwords.');
  return
 }

 S.account=true;
 S.email=e;
 save();
 document.getElementById('verifyEmail').textContent=e;
 show('verify')
}

function verifyEmail(){
 S.verified=true;
 save();
 alert('Email verified successfully. You can now log in.');
 show('login');
 document.getElementById('loginEmail').value=S.email
}

function login(){
 const e=document.getElementById('loginEmail').value.trim(),
       p=document.getElementById('loginPass').value;

 if(!S.account||!S.verified){
  alert('Please create and verify your account first.');
  return
 }

 if(e!==S.email||!p){
  alert('Enter your account email and password.');
  return
 }

 show('dashboard')
}

function payRegistration(){
 if(!S.verified){
  alert('Verify your email first.');
  return
 }

 S.regPaid=true;
 save();
 refreshDash();
 alert('Registration payment of ₦2,500 recorded successfully in demo mode. Registration is now activated.')
}

function submitRegistration(){
 const required=[
  'firstName',
  'surname',
  'nin',
  'state',
  'lga',
  'city',
  'address',
  'phone',
  'kinName',
  'kinPhone',
  'kinEmail',
  'institution',
  'faculty',
  'department',
  'matric',
  'course',
  'hodName',
  'hodEmail',
  'supName',
  'supEmail'
 ];

 for(const id of required){
  if(!document.getElementById(id).value.trim()){
   alert('Please complete all required registration fields.');
   return
  }
 }

 S.registered=true;
 S.data={
  name:(document.getElementById('firstName').value+' '+document.getElementById('surname').value).trim(),
  institution:document.getElementById('institution').value,
  matric:document.getElementById('matric').value,
  course:document.getElementById('course').value
 };

 save();
 alert('Registration submitted successfully.');
 show('dashboard')
}

function payProject(){
 if(!S.registered){
  alert('Complete your registration first.');
  return
 }

 S.projectPaid=true;
 save();
 refreshDash();
 alert('Project-upload payment of ₦4,800 recorded successfully in demo mode. Project upload is now enabled.')
}

function uploadProject(){
 if(!S.projectPaid){
  alert('Pay the ₦4,800 project-upload fee first.');
  return
 }

 if(!document.getElementById('projectFile').files.length){
  alert('Please select your project file.');
  return
 }

 S.uploaded=true;
 save();
 alert('Project uploaded successfully. Compliance clearance is now available.');
 show('dashboard')
}

function refreshDash(){
 document.getElementById('dashEmail').textContent=S.email||'';

 document.getElementById('stEmail').textContent=
  S.verified?'Verified':'Pending';

 document.getElementById('stEmail').className=
  'badge '+(S.verified?'paid':'pending');

 document.getElementById('stReg').textContent=
  S.registered?'Completed':(S.regPaid?'Activated':'Locked');

 document.getElementById('stReg').className=
  'badge '+(S.registered||S.regPaid?'paid':'locked');

 document.getElementById('stProject').textContent=
  S.uploaded?'Uploaded':(S.projectPaid?'Enabled':'Locked');

 document.getElementById('stProject').className=
  'badge '+(S.uploaded||S.projectPaid?'paid':'locked');

 const pr=document.getElementById('payReg');
 pr.disabled=S.regPaid;
 pr.textContent=S.regPaid?'₦2,500 Paid':'Pay ₦2,500';

 const pp=document.getElementById('payProject');
 pp.disabled=!S.registered||S.projectPaid;
 pp.textContent=S.projectPaid?'₦4,800 Paid':'Pay ₦4,800';

 const or=document.getElementById('openReg');
 or.disabled=!S.regPaid||S.registered;
 or.textContent=S.registered?'Registration Completed':'Begin Registration';

 document.getElementById('regLock').textContent=
  S.regPaid
   ?(S.registered
      ?'Registration has been submitted.'
      :'Registration is activated. You can now complete the form.')
   :'Pay the ₦2,500 registration fee to activate your registration.';
}
