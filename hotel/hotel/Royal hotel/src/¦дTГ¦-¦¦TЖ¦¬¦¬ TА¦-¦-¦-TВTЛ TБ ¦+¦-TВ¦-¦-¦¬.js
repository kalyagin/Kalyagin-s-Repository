/** 
 * Функции для работы с датами
 * @name DatesUtils 
 * @author ml
 * @version 2.1 
 */

var self = this;


/* Прежде чем добавить - поищи! */

//Типы временных интервалов для группировки данных в отчетах. 
/** @const */var WEEK = 1;
/** @const */var MONTH = 2;
/** @const */var QUARTER = 4;
/** @const */var YEAR = 8;

/** @const */var MS_PER_DAY = 1000 * 60 *60 * 24; // Кол-во миллисекунд в сутках

/** Квартал по месяцу ( месяцы в диапазоне 0 - 11)
 * @type Array
 */
var quartByMonth = [];
quartByMonth[0] = quartByMonth[1] = quartByMonth[2] = 1;
quartByMonth[3] = quartByMonth[4] = quartByMonth[5] = 2;
quartByMonth[6] = quartByMonth[7] = quartByMonth[8]  = 3;
quartByMonth[9] = quartByMonth[10] = quartByMonth[11] = 4;

/** Границы кварталов
 * @type Array
 */
var quartBoundaries = [];
quartBoundaries[1] = {
    first: 0, 
    last: 2
};
quartBoundaries[2] = {
    first: 3, 
    last: 5
};
quartBoundaries[3] = {
    first: 6, 
    last: 8
};
quartBoundaries[4] = {
    first: 9, 
    last: 11
};


/** Возвращает текущую дату и время.
 * @return {Date} Текущее значение даты и времени типа date.
 */
function currentDateTime()
{
    return new Date();
} 

/** Возвращает текущую дату c "обнуленным" временем.
 * @return {Date} Текущая дата со значением времени равным 00:00:00:000
 */
function currentDate()
{
    var dt = new Date();
    dt.setHours(0, 0, 0, 0);
    return dt;
}

/** Возвращает текущую дату-время c "обнуленной" датой.
 * @return {Date} Текущая дата-время со значением даты, соответствующим "1 января 1970 года"
 */
function currentTime()
{   
    var dt = new Date();
    return new Date(1970,0,1, dt.getHours(), dt.getMinutes(), dt.getSeconds(), dt.getMilliseconds());
}

/** Увеличивает дату на указанное количество лет.
 * Для согласования неравных длин месяцев или лет выполняется корректировка. 
 * Например, результатом прибавления года к <i>29 февраля</i> будет <i>28 февраля</i> следующего года.<br>
 * @param {Date} aDate Дата.
 * @param {Number} yearsAmount Количество лет, на которое увеличивается дата. Если значение меньше 0, то дата уменьшается.
 * @return {Date|null} Измененная дата.<br> 
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 * Если параметр <i>yearsAmount</i> не определен, то функция вернет значение параметра <i>aDate</i>. 
 */
function incYear(aDate, yearsAmount) 
{
    if (aDate){
        if (yearsAmount){
            var dt = new Date(aDate.getTime());
            dt.setFullYear(dt.getFullYear() + yearsAmount);
            if (aDate.getMonth() < dt.getMonth())
                dt.setDate(0);
            return dt;
        }else
            return aDate;
    }
    return null;
}

/** Увеличивает дату на указанное количество месяцев.  При необходимости значение года изменяется автоматически.
 * При добавлении месяцев предполагается, что новая дата будет тем же днем месяца, т.е. если, например, месяц прибавлен ко <i>2 января</i> какого-либо года, 
 * то результат должен быть <i>2 февраля</i>. Но если месяц добавлен к <i>31 января</i>, то результатом будет последний день Февраля.<br> 
 * @param {Date} aDate Дата.
 * @param {Number} monthsAmount Количество месяцев, на которое увеличивается дата. Если значение меньше 0, то дата уменьшается.
 * @return {Date|null} Измененная дата. Время остается без изменений.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 * Если параметр <i>monthsAmount</i> не определен, то функция вернет значение параметра <i>aDate</i>.
 */
function incMonth(aDate, monthsAmount)
{
    if (aDate){
        if (monthsAmount){
            var dt = new Date(aDate.getTime());            
            dt.setMonth(dt.getMonth() + monthsAmount);
            if (dt.getDate() < aDate.getDate())
                dt.setDate(0);
            return dt;
        }else
            return aDate;
    }
    return null;
}

/** Увеличивает дату на указанное количество дней. При необходимости значения месяца/года изменяются автоматически.
 * @param {Date} aDate Дата
 * @param {Number} daysAmount Количество дней, на которое увеличивается дата. Если значение меньше 0, то дата уменьшается.
 * @return {Date|null} Измененная дата. Время не меняется.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 * Если параметр <i>daysAmount</i> не определен, то функция вернет значение параметра <i>aDate</i>. 
 */
function incDay(aDate, daysAmount)
{
    if (aDate){
        if (daysAmount){
            var dt = new Date(aDate.getTime());
            dt.setDate(dt.getDate() + daysAmount);
            return dt;
        }else
            return aDate;
    }
    return null;
}

/** Увеличивает дату на указанное количество часов. При необходимости значения дня/месяца/года изменяются автоматически.
 * @param {Date} aDate Дата
 * @param {Number} hoursAmount Количество часов, на которое увеличивается дата. Если значение меньше 0, то дата уменьшается.
 * @return {Date|null} Измененная дата.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 * Если параметр <i>hoursAmount</i> не определен, то функция вернет значение параметра <i>aDate</i>.
 */
function incHour(aDate, hoursAmount)
{
    if (aDate){
        if (hoursAmount){
            var dt = new Date(aDate.getTime());
            dt.setHours(dt.getHours() + hoursAmount);
            return dt;
        }else
            return aDate;
    }
    return null;
}

/** Увеличивает дату на указанное количество минут.  При необходимости значения часа/дня/месяца/года изменяются автоматически.
 * @param {Date} aDate Дата.
 * @param {Number} minutesAmount Количество минут, на которое увеличивается дата. Если значение меньше 0, то дата уменьшается.
 * @return {Date|null} Измененная дата.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 * Если параметр <i>minutesAmount</i> не определен, то функция вернет значение параметра <i>aDate</i>.
 */
function incMinute(aDate, minutesAmount)
{
    if (aDate){
        if (minutesAmount){
            var dt = new Date(aDate.getTime());
            dt.setMinutes(dt.getMinutes() + minutesAmount);
            return dt;
        }else
            return aDate;
    }
    return null;
}

/** Увеличивает дату на указанное количество секунд.  При необходимости значения минуты/часа/дня/месяца/года изменяются автоматически.
 * @param {Date} aDate Дата.
 * @param {Number} secondsAmount Количество секунд, на которое увеличивается дата. Если значение меньше 0, то дата уменьшается.
 * @return {Date|null} Измененная дата.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 * Если параметр <i>secondsAmount</i> не определен, то функция вернет значение параметра <i>aDate</i>.
 */
function incSecond(aDate, secondsAmount)
{
    if (aDate){
        if (secondsAmount){
            var dt = new Date(aDate.getTime());
            dt.setSeconds(dt.getSeconds() + secondsAmount);
            return dt;		
        }else
            return aDate;
    }
    return null;
}

/** Возвращает целочисленную разницу в днях между двумя датами.
 * @param {Date} aBegDate Начальная дата.
 * @param {Date} aEndDate Конечная дата.
 * @return {Number|null} Число дней между датами.<br>
 * Если <i>aBegDate</i> &lt <i>aEndDate</i>, то возвращается положительное значение.<br>
 * Если <i>aBegDate</i> &gt <i>aEndDate</i>, то возвращается отрицательное значение.<br>
 * Если <i>aBegDate</i> == <i>aEndDate</i>, то возвращается ноль.<br>
 * Если хотя бы один из параметров не задан, возвращается <code>null</code>.
 */
function daysBetween(aBegDate, aEndDate) 
{
    if (aBegDate && aEndDate){
        var edt = new Date(aEndDate.getTime());
        edt.setHours(aBegDate.getHours(), aBegDate.getMinutes(), aBegDate.getSeconds(), aBegDate.getMilliseconds());
        return (edt.getTime() - aBegDate.getTime()) / MS_PER_DAY;
    }
    return null;
}

/** Возвращает целочисленную разницу в миллисекундах между двумя датами.
 * @param {Date} aBegDate Начальная дата.
 * @param {Date} aEndDate Конечная дата.
 * @return {Number|null} Число миллисекунд между датами.<br>
 * Если <i>aBegDate</i> &lt <i>aEndDate</i>, то возвращается положительное значение.<br>
 * Если <i>aBegDate</i> &gt <i>aEndDate</i>, то возвращается отрицательное значение.<br>
 * Если <i>aBegDate</i> == <i>aEndDate</i>, то возвращается ноль.<br>
 * Если хотя бы один из параметров не задан, возвращается <code>null</code>.
 */
function timeBetween(aBegDate, aEndDate) 
{
    if (aBegDate && aEndDate)
        return aEndDate.getTime() - aBegDate.getTime();
    return null;
}

/** Определяет, является ли год високосным.<br>
 * Год считается високосным только в том случае, если он делится на 4 без остатка,
 * но при этом не делится на 100 без остатка, 
 * или, если делится на 100, должен делится и на 400 без остатка.
 * @param {Number} aYear Год в формате YYYY.
 * @return {Boolean|null} <code>true</code> - если год високосный, иначе <code>false</code>.<br>
 * Если значение года не определено или не является положительным числом,
 * то возвращается <code>null</code>.
 */
function isLeapYear(aYear)
{
    if (aYear && aYear > 0)
        return (aYear % 4 === 0) && (aYear % 100 !== 0 || aYear % 400 === 0);    
    return null;
}

/** Возвращает число дней в году, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Number|null} Число дней в году, на который приходится дата.<br/>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.<br>
 */
function daysInYear(aDate)
{
    if (aDate){
        return isLeapYear(aDate.getFullYear()) ? 366 : 365;
    }
    return null;
}

/** Возвращает число дней в месяце, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Number|null} Число дней в месяце, на который приходится дата.<br/>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function daysInMonth(aDate)
{
    if (aDate)
        return new Date(aDate.getFullYear(), aDate.getMonth() + 1, 0).getDate();    
    return null;
}

/** Возвращает начало дня, соответствующего заданной дате.
 * @param {Date} aDate Дата.
 * @return {Date|null} Дата со значением времени, установленным в 00:00:00:000.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function beginOfDay(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setHours(0, 0, 0, 0);
        return dt;
    }
    return null;	
}

/** Возвращает конец дня, соответствующего заданной дате.
 * @param {Date} aDate Дата.
 * @return {Date|null} Дата со значением времени, установленным в 23:59:59:999.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function endOfDay(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setHours(23, 59, 59, 999);
        return dt;
    }
    return null;	
}

/** Возвращает начало недели (понедельник), на которую приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null} Первый день недели, на который приходится заданная дата. Значение времени установлено в 00:00:00:000.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>. 
 */
function beginOfWeek(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setHours(0, 0, 0, 0);
        var day = dt.getDay();
        var diff = dt.getDate() - day + (day === 0 ? -6 : 1);
        dt.setDate(diff);        
        return dt;
    }
    return null;	
}

/** Возвращает конец недели, на которую приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null}  Последний день недели, на который приходится заданная дата. Значение времени установлено в 23:59:59:999.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>. 
 */
function endOfWeek(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setHours(23, 59, 59, 999);
        var day = dt.getDay();
        var diff = dt.getDate() + (day == 0 ? day : 7 - day);
        dt.setDate(diff);
        return dt;
    }
    return null;	
}

/** Возвращает начало месяца, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null} Первый день месяца, на который приходится заданная дата. Значение времени установлено в 00:00:00:000.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function beginOfMonth(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setDate(1);
        return beginOfDay(dt);
    }
    return null;	
}

/** Возвращает конец месяца, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|number} Последний день месяца, на который приходится заданная дата. Значение времени установлено в 23:59:59:999.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>. 
 */
function endOfMonth(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setDate(daysInMonth(aDate));
        return endOfDay(dt);
    }
    return null;	
}

/** Возвращает первый месяц квартала, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Number|null} Номер первого месяца квартала, на который приходится заданная дата.<br>
 * Значения номера месяца считаются с нуля.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>. 
 */
function firstMonthOfQuart(aDate){
    if (aDate)
        return quartBoundaries[quartOf(aDate)].first;    
    return null;    
}

/** Возвращает последний месяц квартала, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Number|null} Номер последнего месяца квартала, на который приходится заданная дата.<br>
 * Значения номера месяца считаются с нуля.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>. 
 */
function lastMonthOfQuart(aDate){
    if (aDate)
        return quartBoundaries[quartOf(aDate)].last;    
    return null;    
}

/** Возвращает начало квартала, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null} Первый день квартала, на который приходится заданная дата. Значение времени установлено в 00:00:00:000.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function beginOfQuart(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setMonth(firstMonthOfQuart(aDate));
        return beginOfMonth(dt);
    }    
    return null;
}

/** Возвращает конец квартала, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null} Последний день квартала, на который приходится заданная дата. Значение времени установлено в 23:59:59:999.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function endOfQuart(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setMonth(lastMonthOfQuart(aDate));
        return endOfMonth(dt);
    }
    return null;
}
 
/** Возвращает начало года, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null} Первый день года, на который приходится заданная дата. Значение времени установлено в 00:00:00:000.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function beginOfYear(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setMonth(0);
        dt.setDate(1);
        return beginOfDay(dt);        
    }
    return null;	
}

/** Возвращает конец года, на который приходится заданная дата.
 * @param {Date} aDate Дата.
 * @return {Date|null} Последний день года, на который приходится заданная дата. Значение времени установлено в 23:59:59:999.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function endOfYear(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setMonth(11);
        dt.setDate(31);
        return endOfDay(dt);
    }
    return null;	
}

/** Возвращает год в формате YYYY, на который приходится заданная дата. 
 * @param {Date} aDate Дата.
 * @return {Number|null} Год, на который приходится заданная дата.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function yearOf(aDate)
{
    if (aDate)
        return aDate.getFullYear();
    return null;	
}

/** Возвращает квартал, на который приходится заданная дата.<br>
 * Значение номера квартала находится в диапазоне от 1 до 4.
 * @param {Date} aDate Дата.
 * @return {Number|null} Номер квартала, на который приходится заданная дата.<br> 
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function quartOf(aDate){
    if (aDate)
        return quartByMonth[aDate.getMonth()];    
    return null;
}

/** Возвращает месяц, на который приходится заданная дата.<br>
 * Значение номера месяца находится в диапазоне от 0 до 11.
 * @param {Date} aDate Дата.
 * @return {Number|null} Месяц, на который приходится заданная дата.<br> 
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function monthOf(aDate)
{
    if (aDate)
        return aDate.getMonth();
    return null;	
}

/** Возвращает день месяца, на который приходится заданная дата.
 * Значение номера дня находится в диапазоне от 1 до 31.<br> 
 * @param {Date} aDate Дата.
 * @return {Number|null} День месяца, на который приходится заданная дата.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function dayOf(aDate)
{
    if (aDate)
        return aDate.getDate();
    return null;	
}
 
/** Возвращает значение часов из заданной даты.<br>
 * Значение часов находится в диапазоне от 0 до 23.
 * @param {Date} aDate Дата.
 * @return {Number|null} Значение часов из заданной даты.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function hourOf(aDate)
{
    if (aDate)
        return aDate.getHours();
    return null;	
}


/** Возвращает значение минут из заданной даты.<br> 
 * Значение минут находится в диапазоне от 0 до 59.
 * @param {Date} aDate Дата.
 * @return {Number|null} Значение минут из заданной даты.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function minuteOf(aDate)
{
    if (aDate)
        return aDate.getMinutes();
    return null;	
}
 
/** Возвращает значение секунд из заданной даты.<br>
 * Значение секунд находится в диапазоне от 0 до 59.
 * @param {Date} aDate Дата.
 * @return {Number|null} Значение секунд из заданной даты.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function secondOf(aDate)
{
    if (aDate)
        return aDate.getSeconds();
    return null;	
}

/** Возвращает значение миллисекунд из заданной даты.<br>
 * Значение секунд находится в диапазоне от 0 до 999.
 * @param {Date} aDate Дата.
 * @return {Number|null} Значение миллисекунд из заданной даты.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function millisecondOf(aDate)
{
    if (aDate)
        return aDate.getMilliseconds();    
    return null;	
}

/** Возвращает номер недели в году (по ISO), на которую приходится заданная дата.<br>
 * Значение номеров недели находится в диапазоне от 1 до 52.
 * @see http://en.wikipedia.org/wiki/ISO_week_date
 * @param {Date} aDate Дата.
 * @return {Number|null} Номер недели в году, на которую приходится заданная дата.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function weekOfYear(aDate)
{
    if (aDate){    
        // Copy date so don't modify original
        var dt = new Date(aDate.getTime());
        dt.setHours(0, 0, 0);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        dt.setDate(dt.getDate() + 4 - (dt.getDay() || 7));
        // Get first day of year
        var yearStart = new Date(dt.getFullYear(), 0, 1);
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil(( ( (dt - yearStart) / MS_PER_DAY) + 1) / 7);
        // Return week number
        return weekNo;
    }
    return null;	
}

/** Возвращает номер дня в году, на который приходится заданная дата.<br>
 * Значение дней находится в диапазоне от 1 до 366. 
 * @param {Date} aDate Дата.
 * @return {Number|null} Номер дня в году, на который приходится заданная дата.<br> 
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function dayOfYear(aDate)
{
    if (aDate){
        var onejan = beginOfYear(aDate);
        return Math.ceil((aDate.getTime() - onejan.getTime()) / MS_PER_DAY);
    }
    return null;	
}

/** Возвращает номер дня в неделе, на которую приходится заданная дата.<br>
 * Значение дней находится в диапазоне от 1 до 7.<br> 
 * @param {Date} aDate Дата.
 * @return {Number|null} Номер дня в неделе, на которую приходится заданная дата.
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function dayOfWeek(aDate)
{
    if (aDate){
        var num = aDate.getDay();
        return (num !== 0) ? num : 7;
    }
    return null;	
}
 
var twoDigits = function(num){
    return (num > 9 ? num : "0" + num);
}; 
 
/** Возвращает строковое представление заданной даты со временем в формате <i>ДД.ММ.ГГГГ ЧЧ:ММ:СС</i>. 
 * @param {Date} aDate Дата.
 * @return {String|null} Строковое представление даты со временем.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function dateTimeToString(aDate)
{
    if (aDate)
        return dateToString(aDate) + " " + timeToString(aDate);    
    return null;	
}

/** Возвращает строковое представление заданной даты со временем в формате <i>ДД.ММ.ГГГГ ЧЧ:ММ:СС:ММММ</i> (с миллисекундами). 
 * @param {Date} aDate Дата.
 * @return {String|null} Строковое представление даты со временем.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function dateTimeWithMillisToString(aDate)
{
    if (aDate)
        return dateToString(aDate) + " " + timeToString(aDate) + ":" + millisecondOf(aDate) ;    
    return null;	
}

/** Возвращает строковое представление заданной даты без времени в формате <i>ДД.ММ.ГГГГ</i>
 * @param {Date} aDate Дата.
 * @return {String|null} Строковое представление даты без времени.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function dateToString(aDate)
{
    if (aDate){
        var d = aDate.getDate();
        var m = aDate.getMonth() + 1;
        var y = aDate.getFullYear();
        return twoDigits(d) + "." + twoDigits(m) + "." + y;
    }
    return null;	
}
 
/** Возвращает строковое представление заданной даты без времени в формате <i>ММ.ГГГГ</i> 
 * @param {Date} aDate Дата.
 * @return Строковое представление даты в формате <i>ММ.ГГГГ</i><br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>. 
 */
function monthToString(aDate)
{
    if (aDate)  {
        var m = aDate.getMonth() + 1;
        var y = aDate.getFullYear();
        return twoDigits(m) + "." + y;
    }
    return null;	
}

/** Возвращает строковое представление времени для заданной даты в формате <i>ЧЧ:ММ:СС</i>
 * @param {Date} aDate Дата.
 * @return {String|null} Строковое представление времени из заданной даты.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function timeToString(aDate)
{
    if (aDate){
        var h = aDate.getHours();
        var mm = aDate.getMinutes();
        var s = aDate.getSeconds();
        return twoDigits(h) + ":" + twoDigits(mm) + ":" +  twoDigits(s);
    }
    return null;	
}

/** Возвращает строку формата ЧЧ:ММ:СС для интервала, переданного количеством миллисекунд.
 * @param {Number} aMillis Количество миллисекунд.
 * @return {String|null} Строка формата ЧЧ:ММ:СС<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function millisecondsToTimeInterval(aMillis) {
    if (aMillis){
        var timeBetween = Math.floor(aMillis/1000);
        var seconds = timeBetween%60;
        timeBetween = (timeBetween - seconds)/60;
        var minutes = timeBetween%60;
        var hours = (timeBetween - minutes)/60;
        return hours + ":" + twoDigits(minutes) + ":" + twoDigits(seconds);
    }
    return null;
}

/** Возвращает строковое описание "неявного" интервала между текущим и
 * заданным моментом времени
 * @param {Date} aTimeStamp 
 * @returns {String} Строка с описанием "неявного интервала"
 */
function describeDeepness(aTimeStamp) {
    var moment = new Date();
    var today = beginOfDay(moment);
    var yesterday = beginOfDay(incDay(moment, -1));
    var week = beginOfWeek(moment);
    var pastWeek = beginOfWeek(incDay(moment, -7));
    var year = beginOfYear(moment);
    if (aTimeStamp < moment) {
        if (aTimeStamp < today) {
            if (aTimeStamp < yesterday) {
                if (aTimeStamp < week) {
                    if (aTimeStamp < pastWeek) {
                        if (aTimeStamp < year) {
                            return "В прошлом году";
                        } else
                            return "Больше недели назад";
                    } else
                        return 'На прошлой неделе';
                } else
                    return "На неделе";
            } else
                return "Вчера";
        } else
            return "Сегодня";
    }else
        return "Сейчас";
} 
 
/** Возвращает дату-время, собранную из составных частей.
 * @param {Number} aYear Год в формате ГГГГ.
 * @param {Number} aMonth Месяц (от 1 (Янв) до 12 (Дек)).
 * @param {Number} aDay День месяца (от 1 до 31).
 * @param {Number|null} aHour Количество часов (от 0 до 23). Должен быть указан, если указан параметр <i>aMinute</i>.
 * @param {Number|null} aMinute Количество минут (от 0 до 59). Должен быть указан, если указан параметр <i>aSecond</i>. 
 * @param {Number|null} aSecond Количество секунд (от 0 до 59). Должен быть указан, если указан параметр <i>aMillisecond</i>. 
 * @param {Number|null} aMillisecond Количество миллисекунд (от 0 до 999).
 * @return {Date} Новая дата.<br>
 * Если хотя бы один из параметров  <i>aYear</i>, <i>aMonth</i> или <i>aDay</i> не определен
 * или меньше нуля, то функция вернет <code>null</code>.<br>
 * Если значение месяца выходит за рамки определенного диапазона, то функция вернет <code>null</code>.<br>
 * Если значение дня выходит за рамки определенного диапазона, то функция вернет <code>null</code>.<br>
 * Если значение параметров времени выходит за рамки определенных диапазонов, то соответствующий параметр будет установлен в ноль.
 */
function date(aYear, aMonth, aDay, aHour, aMinute, aSecond, aMillisecond)
{
    if (!aYear || !aMonth || !aDay)
        return null; 
    var dt = new Date(1970, 0, 1);
    if (aYear > 0)
        dt.setFullYear(aYear);
    else
        return null;
    if (aMonth >= 1 && aMonth <= 12)
        dt.setMonth(aMonth);
    else
        return null;
    if (aDay >= 1 && aDay <= daysInMonth(dt))
        dt.setDate(aDay);
    else
        return null;
    if (aHour && aHour >= 0 && aHour <= 23)
        dt.setHours(aHour);
    if (aMinute && aMinute >= 0 && aMinute <= 59)
        dt.setMinutes(aMinute);
    if (aSecond && aSecond >= 0 && aSecond <= 59)
        dt.setSeconds(aSecond);
    if (aMillisecond && aMillisecond >= 0 && aMillisecond <= 999)
        dt.setMilliseconds(aMillisecond);		
    return dt;
}

/** Возвращает дату без миллисекунд(значение миллисекунд установлено в ноль).
 * @param {Date} aDate Дата.
 * @return {Date|null} Дата без миллисекунд.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function unpreciseDateTime(aDate)
{
    if (aDate){
        var dt = new Date(aDate.getTime());
        dt.setMilliseconds(0);
        return dt;
    }
    return null;
}

function amountDescription(amount, txt1, txt0_5, txt24, txt1114)
{
    var desc = null;
    amount = Math.abs(amount);
    var tailAmount = Math.round((amount/10 - Math.floor(amount/10))*10);
    var tailAmount2 = Math.round((amount/100 - Math.floor(amount/100))*100);
    if(tailAmount2 > 10 && tailAmount2 < 15)
    {
        desc = txt1114;
    }else
    {
        if(tailAmount < 1)
        {
            desc = txt0_5;
        }else if(tailAmount === 1)
        {
            desc = txt1;
        }else if(tailAmount > 1 && tailAmount < 5)
        {
            desc = txt24;
        }else
        {
            desc = txt0_5;
        }
    }
    return desc;
}

/** Возвращает период ночного времени в миллисекундах
 * @param {Date} aBegDate Начало ночного периода.
 * @param {Date} aEndDate Конец ночного периода.
 * @return {Number} Число миллисекунд.
 */
function calcNightPeriod(aBegDate, aEndDate)
{
    if(aEndDate > aBegDate)
    {
        var leftNightBegin  = beginOfNight(aBegDate);
        var rightNightBegin = beginOfNight(aEndDate);

        var leftNightEnd = endOfNight(leftNightBegin);
        var leftNightPeriod = leftNightEnd - leftNightBegin;
        var leftPeriod = aBegDate - leftNightBegin;
        var leftNight = 0;
        if(leftPeriod < leftNightPeriod)
            leftNight = leftNightPeriod - leftPeriod;
			
        if(leftNightBegin !== rightNightBegin)		
        {
            var rightNightEnd = endOfNight(rightNightBegin);
            var rightNightPeriod = rightNightEnd - rightNightBegin;
            var rightPeriod = aEndDate - rightNightBegin;
            var rightNight = rightPeriod;
            if(rightNightPeriod < rightNight)
                rightNight = rightNightPeriod;
			
            var middleNight = (daysBetween(leftNightBegin, rightNightBegin)-1)*8*3600*1000;
            return leftNight + middleNight + rightNight;
        }else
        {
            if(leftNight > 0)
            {
                return rightNight-leftPeriod;
            }else
                return 0;
        }
    }else
        return 0;
}

/** Возвращает ближайшее слева начало ночи.
 * @param {Date} aDate Дата. 
 * @return {Date|null} Заданная дата со значением часов, равным 22.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function beginOfNight(aDate)
{
    if (aDate)
    {
        var dt = new Date(aDate.getTime());
        var h = hourOf(aDate);
        if (h < 22)
            dt.setDate(dt.getDate()-1);
        dt.setHours(22);
        dt.setMinutes(0);
        dt.setSeconds(0);
        dt.setMilliseconds(0);
        return dt;
    }else
        return null;	
}

/** Возвращает ближайший слева конец ночи, т.е. первый момент утра, следующего за переданным концом ночи.
 * @param {Date} aDate Дата. 
 * @return Заданная дата со значением часов, равным 6.<br>
 * Если параметр <i>aDate</i> не определен, то функция вернет <code>null</code>.
 */
function endOfNight(aDate)
{
    if (aDate){
        var dt = beginOfNight(aDate);
        dt.setDate(dt.getDate() + 1);
        dt.setHours(6);
        dt.setMinutes(0);
        dt.setSeconds(0);
        dt.setMilliseconds(0);
        return dt;
    }
    return null;	
}

/** Определяет равенство двух дат путем сравнения количества миллисекунд.
 * @param {Date} aDate1 Дата 1 
 * @param {Date} aDate2 Дата 2 
 * @return {Boolean|null} <code>true</code> - если даты одинаковы, <code>false</code> - в противоположном случае.<br>
 * Если один из параметров не определен, то функция вернет <code>null</code>.
 */
function equal(aDate1, aDate2){
    if (aDate1 && aDate2)
        return aDate1.getTime() === aDate2.getTime();
    return null;
}