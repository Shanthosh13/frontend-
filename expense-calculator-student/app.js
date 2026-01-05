// Simple expense calculator and pie chart (no external chart lib)
function q(id){return document.getElementById(id)}
function format(n){ return '₹' + Number(n).toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) }

// Login management
function hideLoginModal(){
  const modal = q('loginModal');
  if(modal) modal.style.display = 'none';
}

function showUserGreeting(){
  const userName = localStorage.getItem('userName') || '';
  const greeting = q('userGreeting');
  if(greeting){
    if(userName) greeting.innerText = `Welcome back, ${userName}! 👋`;
    else greeting.innerText = '';
  }
}

function drawPie(canvas, data, labels){
  const ctx = canvas.getContext('2d');
  const total = data.reduce((a,b)=>a+b,0);
  const w = canvas.width, h = canvas.height;
  ctx.clearRect(0,0,w,h);
  // draw legend and pie
  let cx = w/2, cy = h/2, radius = Math.min(w,h)/3;
  let start = -0.5 * Math.PI;
  const colors = ['#6366F1','#06B6D4','#10B981','#F59E0B','#EF4444','#8B5CF6','#F97316']
  for(let i=0;i<data.length;i++){
    const slice = data[i];
    if(slice<=0) continue;
    const angle = (slice/total) * Math.PI*2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,radius,start,start+angle);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();

    // legend
    const lx = 10, ly = 10 + i*20;
    ctx.fillRect(lx, ly, 12, 12);
    ctx.fillStyle = '#111827';
    ctx.font = '12px sans-serif';
    const percent = ((slice/total)*100).toFixed(1) + '%';
    ctx.fillText(labels[i] + ' — ' + percent, lx + 18, ly + 10);

    start += angle;
  }
  if(total===0){
    ctx.fillStyle = '#374151';
    ctx.font = '14px sans-serif';
    ctx.fillText('No data to show', cx - 40, cy);
  }
}

function calculate(){
  const rent = parseFloat(q('rent').value) || 0;
  const foodPerDay = parseFloat(q('foodPerDay')?.value) || 0;
  const food = (foodPerDay > 0) ? (foodPerDay * 30) : (parseFloat(q('food').value) || 0);
  const transport = parseFloat(q('transport').value) || 0;
  const utilities = parseFloat(q('utilities').value) || 0;
  const study = parseFloat(q('study').value) || 0;
  const misc = parseFloat(q('misc').value) || 0;
  const oneTime = parseFloat(q('oneTime').value) || 0;

  const monthlyTotal = rent + food + transport + utilities + study + misc;
  // assume semester = 6 months; prorate one-time costs across semester
  const semesterMonths = 6;
  const semesterTotal = (monthlyTotal * semesterMonths) + oneTime;
  const monthlyWithProrated = monthlyTotal + (oneTime/semesterMonths);
  const dailyAvg = monthlyWithProrated / 30;

  q('monthlyTotal').innerText = format(monthlyWithProrated);
  q('semesterTotal').innerText = format(semesterTotal);
  q('dailyAvg').innerText = format(dailyAvg);

  const labels = ['Rent','Food','Transport','Utilities','Study','Misc'];
  const breakdown = [rent, food, transport, utilities, study, misc];
  const canvas = q('breakdownChart');
  drawPie(canvas, breakdown, labels);
}

document.addEventListener('DOMContentLoaded', function(){
  // Login handlers
  const loginForm = q('login-form');
  if(loginForm){
    q('submitLogin')?.addEventListener('click', function(){
      const userName = q('userName')?.value.trim() || '';
      const userEmail = q('userEmail')?.value.trim() || '';
      if(userName || userEmail){
        localStorage.setItem('userName', userName);
        localStorage.setItem('userEmail', userEmail);
        hideLoginModal();
        showUserGreeting();
      } else {
        alert('Please enter at least a name or email to login.');
      }
    });
    q('skipLogin')?.addEventListener('click', function(){
      hideLoginModal();
    });
  }

  // Check if user has logged in before
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  if(userName || userEmail){
    hideLoginModal();
    showUserGreeting();
  }

  // Calculator handlers
  q('calculate').addEventListener('click', calculate);
  q('reset').addEventListener('click', function(){
    ['rent','food','foodPerDay','transport','utilities','study','misc','oneTime'].forEach(id=>q(id).value='0');
    calculate();
  });
  calculate();
});
