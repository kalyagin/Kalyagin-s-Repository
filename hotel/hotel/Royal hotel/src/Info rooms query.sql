/**
 *
 * @author михаил
 * @name Info_rooms_query
 */ 
Select * 
From ROOMS t1
 Inner Join ROOMTYPE t on t1.ROOMTYPE_ID = t.ROOMTYPE_ID
where ROOMS_ID= ROOMS_ID
