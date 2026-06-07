 // לפני תחילת המשחק, בודקים אם המשתמש מחובר
if (localStorage.getItem('isLoggedIn') !== 'true') {
    alert("עליך להתחבר או להירשם לפני שמתחילים לשחק!");
    window.location.href = "open.html"; // מפנים לדף ההתחברות/
}
//שינויים: בפעולה פיניש של שחקן ב צריך לשנות לסאמ1
// שינויים: let NamesDiv=document.querySelector('.Name'); ולא גט אלמנט
//שיפורים: אפשר בבדיקה אם נעצרנו בקופה או לא לעשות בלולאה אחת
let arr=[ 0, 4,4,4 ,4,4,4, 0 ,4,4,4 ,4,4,4];//איפוס נתונים לתחילת המשחק כלמור חלוקת 4 גולות לכל גומה
let board=document.querySelectorAll('.grid-item');
for(let i=0;i<board.length;i++)
{
    board[i].innerHTML='4';
}
let store = document.querySelector('.grid-item-store1');
store.innerHTML='0';
store = document.querySelector('.grid-item-store2');
store.innerHTML='0';
let flag=true;
let player=1;//פרמטר לדעת איזה שחקן זה עכשיו
let ind;
let stones;
let curentId;
let player1;
let player2;
function showMessage(msg, isGood) {
    let el = document.getElementById('message');
    el.textContent = msg;
    el.style.visibility = 'visible';
    el.style.backgroundColor = isGood ? '#d4edda' : '#f8d7da';
    el.style.color = isGood ? '#155724' : '#721c24';
    setTimeout(() => { el.style.visibility = 'hidden'; }, 3000);
}
function showTurn(name) {
    document.getElementById('turnDisplay').textContent = 'תור: ' + name;
}
function check()
{
   let sum=0;
   if(player%2==1){
      for(let i=1;i<7;i++) sum+=arr[i];
      if(sum==0){ finish(); return; }
   } else {
      for(let i=8;i<14;i++) sum+=arr[i];
      if(sum==0){ finish(); return; }
   }
   if(player%2==0)//שחקן ב
   {
    showMessage("תור של " + player2, true);
    showTurn(player2);
    curentId= event.target.id.slice(3)
    if(curentId>=8 && curentId<=13)//כלומר התחיל מהגומות שלו
    {
        if (arr[curentId] == 0) {
            showMessage("הגומה ריקה, בחר גומה אחרת", false);
            return;
        }
        event.target.innerHTML=0;
        ind= parseInt( curentId)+1;
        stones=parseInt( curentId)+arr[curentId]+1;
        for(let i=ind;i<stones;i++)
        {
            if(ind<14)
            {
                if(i==7)
                    stones++;
                else if(ind==0)
                    stones++;
                else{
                    arr[ind]++
                    document.getElementById(`pit${ind}`).innerHTML=arr[ind];
                }
                
            }
            if(ind==14)
            {
                arr[0]++;
                document.querySelector('.grid-item-store1').innerHTML=arr[0];
                ind=-1;
            }
            ind++;
        }
        arr[curentId]=0;
        flag=true;
        loop(--ind,2);
    }
    else
    showMessage("התחל מאחת הגומות בצד שלך", false);
    }
   
    else if(player%2==1)//שחקן א
    {
    showMessage("תור של " + player1, true);
    showTurn(player1);
    curentId= event.target.id.slice(3)
    if(curentId>=1 && curentId<=6)//כלומר התחיל מהגומות שלו
    {
        if (arr[curentId] == 0) {
            showMessage("הגומה ריקה, בחר גומה אחרת", false);
            return;
        }
        event.target.innerHTML=0;
        ind= parseInt( curentId)+1;
        stones=parseInt( curentId)+arr[curentId]+1;
        for(let i=ind;i<stones;i++)
        {
            if(ind<14)
            {
               if(ind==7)
               {
                arr[ind]++;
                document.querySelector('.grid-item-store2').innerHTML=arr[ind];
               }
               else if(ind==0)
               {
                stones++;
               }
               else
               {
                arr[ind]++
                document.getElementById(`pit${ind}`).innerHTML=arr[ind];
               }    
            }
            if(ind==14)
            {              
                ind=-1;
                stones++;                
            }
            ind++;
        }
        arr[curentId]=0;
        flag=true;
        loop(--ind,1);
        
    }
    else
    showMessage("התחל מאחת הגומות בצד שלך", false);
    
   }
   
  }
  
  function loop(index,play)
{
    if(finish())//בדיקה אם המשחק נגמר 
     return;
    player=play;
    showTurn(player==1 ? player1 : player2);
    curentId=index;
    if(player==1 && index==7)
    {
            showMessage(player1 + ", יש לך תור נוסף!", true);
            flag=false;
            return;
    }
    if(player==2 && index==0)
    {
            showMessage(player2 + ", יש לך תור נוסף!", true);
            flag=false;
            return;
    }
    while(arr[curentId]>1 && flag&&curentId!=0&&curentId!=7)//כל עוד נעצרת בגומה שיש בה עוד גולות לחלק
    {
        document.getElementById(`pit${index}`).innerHTML=parseInt(0);
        ind= curentId+1;
        stones= curentId+arr[curentId]+1;
        arr[curentId]=0;
        for(let i= ind;i<stones;i++)
        {
            if(player%2==1)//שחקן 1
            {
                if(ind<14 && ind!=7)
                {
                    if(ind==0)
                        stones++;
                    else{
                        arr[ind]++
                        document.getElementById(`pit${ind}`).innerHTML=arr[ind];
                    }
                    
                }
                if(ind==7)//הגעת לקופה שלך
                {
                    arr[7]++;
                    document.querySelector('.grid-item-store2').innerHTML=arr[7];
                    
                }
                if(ind>13)
                {
                    ind=-1;
                    stones++;
                }
                    
                // if(stones-1 ==i)
                //     ind--;
                ind++;
            }
            if(player%2==0)
            {
                if(ind<14)
                {
                     if(ind==7)
                        stones++;
                    else if(ind==0)
                        stones++;
                    else{
                    arr[ind]++
                    document.getElementById(`pit${ind}`).innerHTML=arr[ind];
                    }
                
                }
                if(ind==14)
                {
                    arr[0]++;
                    document.querySelector('.grid-item-store1').innerHTML=arr[0];
                    ind=-1;
                }
                ind++;
            }
           
        }
        if((player==1 && ind==7)||(player==2 && ind==0))
        {
            showMessage("יש לך תור נוסף!", true);
            flag=false;
            return;
        }
        curentId=ind;

        index=curentId;
    }
    if(finish()) return;
    if(arr[curentId]==0 && curentId!=0 && curentId!=7) {
        if(player==1 && curentId>=1 && curentId<=6) {
            let opp=14-curentId;
            arr[7]+=arr[opp]+1;
            arr[opp]=0;
            document.querySelector('.grid-item-store2').innerHTML=arr[7];
            document.getElementById(`pit${curentId}`).innerHTML=0;
            document.getElementById(`pit${opp}`).innerHTML=0;
        }
        if(player==2 && curentId>=8 && curentId<=13) {
            let opp=14-curentId;
            arr[0]+=arr[opp]+1;
            arr[opp]=0;
            document.querySelector('.grid-item-store1').innerHTML=arr[0];
            document.getElementById(`pit${curentId}`).innerHTML=0;
            document.getElementById(`pit${opp}`).innerHTML=0;
        }
    }
    if(flag)
        player++;//אחרי בדיקה שלא נפל בקופה
}

 function finish()
{
    let sum1=0,sum2=0;
    for(let i=1;i<7;i++)
      sum1+=arr[i];
    for(let i=8;i<14;i++)
      sum2+=arr[i];
    if(sum1==0)
    {
        arr[7]+=sum2;
        document.querySelector('.grid-item-store2').innerHTML=arr[7];
        for(let i=8;i<14;i++)
        {
            arr[i]=0;
            document.getElementById(`pit${i}`).innerHTML=arr[i];
        }
        showMessage("סיום המשחק! ניצחון לשחקן א", true);
        showTurn("שחקן א");

        return true;
    }
    if(sum2==0)
    {
        arr[0]+=sum1;
        document.querySelector('.grid-item-store1').innerHTML=arr[0];
        for(let i=1;i<7;i++)
        {
            arr[i]=0;
            document.getElementById(`pit${i}`).innerHTML=arr[i];
        } 
        showMessage("סיום המשחק! ניצחון לשחקן ב", true);
        showTurn("שחקן ב");

        return true;
    }  
    return false;
}

document.getElementById('startBtn').addEventListener('click', function() {
    player1 = document.getElementById('name1').value || 'שחקן א';
    player2 = document.getElementById('name2').value || 'שחקן ב';
    document.getElementById('startForm').style.display = 'none';
    showTurn(player1);
});

