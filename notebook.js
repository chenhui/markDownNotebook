
var vm = new Vue({

    // created() {
    //     this.content = localStorage.getItem('content') || 'You can write in **markdown**'
    // },

    el: "#notebook",

    data: {
        content: "",
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        selectedId: localStorage.getItem('selected-id') || null,
    },

    computed: {
        previewMarked() {
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },

        addButtonTitle() {
            return this.notes.length + '  notebook'
        },

        selectedNote() {
            return this.notes.find(note => note.id === this.selectedId)
        }
    },

    watch: {
        content: {
            handler: 'saveNote',
        },
        notes: {
            handler: "saveNotes",
            deep: true,
        },

        selectedId(val) {
            localStorage.setItem('selected-id', val)
        }
    },

    methods: {
        addNote() {
            const time = Date.now()
            const note = {
                id: String(time),
                title: 'New note' + (this.notes.length + 1),
                content: '**Hi!**',
                created: time,
                favorite: false,
            }
            this.notes.push(note)
        },

        saveNote() {
            console.log('saving notes:', this.notes)
            localStorage.setItem('notes', JSON.stringify(this.notes))
            // localStorage.setItem('content', this.content)
        },

        selectNote(note) {
            this.selectedId = note.id,
                console.log(this.selectedId)
        },

        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes))
            console.log('Notes saved: ', new Date())
        },

        removeNote() {
            console.log("remove note is called")
            if (this.selectedNote && confirm('Delete the note ?')) {
                const index = this.notes.indexOf(this.selectedNote)
                if (index !== -1) {
                    this.notes.splice(index, 1)
                }
            }
        }
    }
})