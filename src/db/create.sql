CREATE TABLE IF NOT EXISTS "label"(
    "_id" SERIAL,
    "name" TEXT NOT NULL,
    PRIMARY KEY("_id")
);
CREATE INDEX IF NOT EXISTS "label_name_index" ON
    "label"("name");

CREATE TABLE IF NOT EXISTS "todo"(
    "_id" SERIAL,
    "title" TEXT NOT NULL,
    "color" TEXT NOT NULL DEFAULT '#fafafa',
    "isCheckBoxMode" BOOLEAN NOT NULL DEFAULT FALSE,
    "createdAt" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY("_id")
);
CREATE INDEX IF NOT EXISTS "todo_title_index" ON
    "todo"("title");

CREATE TABLE IF NOT EXISTS "junction"(
    "_id" SERIAL,
    "label_id" INTEGER NOT NULL,
    "todo_id" INTEGER NOT NULL,
    PRIMARY KEY("_id"),
    CONSTRAINT "junction_label_id_foreign" FOREIGN KEY("label_id") REFERENCES "label"("_id"),
    CONSTRAINT "junction_todo_id_foreign" FOREIGN KEY("todo_id") REFERENCES "todo"("_id")
);

CREATE TABLE IF NOT EXISTS "note"(
    "_id" SERIAL,
    "todo_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY("_id"),
    CONSTRAINT "note_todo_id_foreign" FOREIGN KEY("todo_id") REFERENCES "todo"("_id")
);