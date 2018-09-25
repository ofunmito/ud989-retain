// app separates concerns
$(function() {

    // model
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };

    // octopus: binds the view and the model together
    var octopus = {
        addNewNote: function(noteStr) {
            // the addNewNote calls the model's add method 
            // to add a New Note and then render the new note
            // the view isn't directly modifying the model
            model.add({
                content: noteStr
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };

    // this is the view.
    var view = {
        init: function() {
            // query the notes
            this.noteList = $('#notes');
            // query the form
            var newNoteForm = $('#new-note-form');
            // query the form's input
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e) {
                // get the content of the form input
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },

        // render the view using the getNOtes method on the octopus
        render: function() {
            var htmlStr = '';
            octopus.getNotes().forEach(function(note) {
                // append new notes to the 'notes' unordered list
                htmlStr += '<li class="note">' +
                    note.content +
                    '</li>';
            });
            this.noteList.html(htmlStr);
        }
    };

    octopus.init();
});