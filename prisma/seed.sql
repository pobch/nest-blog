BEGIN TRANSACTION;
INSERT INTO Article VALUES(1,'Test title 1','Test content 1',1637303793517,1637303793519,5);
INSERT INTO Article VALUES(3,'Test title 3','Test content 3',1637304068343,1637304068343,5);
INSERT INTO User VALUES(3,'pob2@pob.com','$argon2i$v=19$m=4096,t=3,p=1$V3EamwW5cuZo8zv/92gzYQ$HBz+eQ0ZP8EXSkM29uKCsK3ySQ4tIyecDfP/XRyRF+k');
INSERT INTO User VALUES(4,'pob3@pob.com','$argon2i$v=19$m=4096,t=3,p=1$eq4k+J7FxVYw/nIlhFIx1w$XHktuVi54XTxRW2sVX4C0/rIGc21+UCqBle6nqrbZyM');
INSERT INTO User VALUES(5,'admin@pob.com','$argon2i$v=19$m=4096,t=3,p=1$ZN5S0Sdf9l6dzJDyzDSFSg$JTe8Wpz7Cq/3jF0cM9zF63iCl3+rBiYnBRZdUr6/QAY');
COMMIT;
