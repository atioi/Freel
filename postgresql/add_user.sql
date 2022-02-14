create
OR REPLACE function add_user(IN name VARCHAR(100), IN surname varchar(100), IN login varchar(100),
                                    in email varchar(100), in password varchar(100)) RETURNS INTEGER

    LANGUAGE plpgsql
AS
$$
declare
user_id integer;

BEGIN

WITH user_user as (
INSERT
INTO users (name, surname, login, email, password)
VALUES (name, surname, login, email, password)
    RETURNING id)

SELECT id
into user_id
from user_user;

return user_id;

END;

$$





