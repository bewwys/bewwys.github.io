// TODO(): I want to animate something but as always css suck.
//         Time to move on on absolute position and transform animation
//         We need to shrink the height of the task container based on
//         The number of tasks

let current_date = new Date();
let day = current_date.getDate();
let month = current_date.getMonth();
let year = current_date.getFullYear();

// console.log(current_date.toLocaleDateString())

/*
Task format:

{
    id,
    title,
    description,
    due_date,
    priority,
    date_creation
}
*/

let tasks = [
    
];

let task_height = 65;
let current_task_index;
let current_node;
let task_position = 0;

// TODO(): Ok I think I know what's going on. But lazyness is the friend of the lazy person.
function do_task(task, index) {
    let previous_task_position = task_position;
    task_position = index * task_height;
    return m(`div#id-${task.id}.task.absolute[style='transform:translateY(${task_position}px)'][position='${task_position}'].animate-translate-top-60px`, {
        onbeforeupdate: function(newVnode, oldVnode) {
        },
        onupdate: function(vnode) {
        },
        onbeforeremove: function (e) {

        },
        onclick: function(e) {
        }
    },
    [
        m("div.dflex fgap-12px", [
            m(`div#check-for-${task.id}.checkbox.wh-28px.brr-max.br-solid.br-2px.br-color-75.bg-fffbf0.bx-sz-bb.fshrink-0.mt-5px`, {
                onclick: function(e) {
                    for (let sub_index = index; sub_index < tasks.length; sub_index++) {
                        let task_node   = document.getElementById(`id-${tasks[sub_index].id}`);
                        let newPosition = task_node.getAttribute("position") - 65;
                        console.log(newPosition);
                        console.log(task_node);
                        task_node.style.transform = `translateY(${newPosition}px)`; //
                        console.log(task_node.style.transform)
                    }
                    // let index = tasks.findIndex((taskouille) => taskouille.id === task.id);
                    // console.log("Tu as cliqué sur l'élément avec l'index " + index);
                    // current_task_index = tasks.findIndex((taskouille) => taskouille.id === task.id);
                    // tasks.splice(index, 1);
                }
            }),
            m("div.task-title", {innerHTML: task.title})
        ]),
        m("div.t-alg-r.mt-5px.ft-10px.fc-75", {innerHTML: "Boite de reception"}),
        m("div.h-1px.bg-e9 my-8px")
    ]);
}

function do_icon_button(padding_right, img_src ="\'\'") {
    return m(`button.pr-${padding_right}px`, [
        m(`img[src=\'${img_src}\']`)
    ]);
}

let counter = 0;
function add_task(title) {
    tasks.push({
        id: tasks.length,
        title: title,
        done:0,
        data_creation: {
            year: year,
            day: day,
            month: month + 1
        }
    });
}

let app = {
    view: function() {
        return [
            m("div.main-nav.h-56px.w-100p.bg-fffbf0.dflex.fd-row.fjc-sb.fai-center.px-19px.bx-sz-bb", [
                m("div.w-33p", [
                    do_icon_button(9, "./public/img/menu_icon.svg"),
                    do_icon_button(9, "./public/img/home_icon.svg"),
                    do_icon_button(9, "./public/img/search_icon.svg")
                ]),
                m("div.w-33p", [do_icon_button(16, "./public/img/add_icon.svg")]),
                m("div.w-33p", [
                    do_icon_button(9, "./public/img/check_icon.svg"),
                    do_icon_button(9, "./public/img/bell_icon.svg"),
                    do_icon_button(0, "./public/img/user_icon.svg")
                ])
            ]),
            m("div.main-section.pl-56px.pr-19px.mt-34px.bx-sz-bb", [
                m("div.main-feature dflex fjc-sb mb-34px", [
                    m("p.fw-medium", [
                        m("span.pr-15px.fw-medium.ft-32px", {innerHTML: "Aujourd'hui"}),
                        m("span.fz-10px.fc-75.fw-regular", {innerHTML: `12 nov`})
                    ]),
                    m("button.mt-5px", m("img[src='./public/img/settings_icon.svg']"))
                ]),
                tasks.length > 0 ? m("div.tasks.relative#tasks", [
                    tasks.map(function(task, index) {
                        let tasks_dom = document.getElementById("tasks");
                        if (tasks_dom !== null) {
                            tasks_dom.style.height = (tasks.length * task_height) + "px";
                        }
                        return do_task(task, index);
                    })
                ]): m("p.mb-8px.pl-39px.mt-28px", {innerHTML:"Aucune tâche"}, m("div.h-1px.bg-e9 my-8px")),
                m("div#add-task.add-task mt-28px", [
                    m("div.dflex.fgap-12px", [
                        m("button#add-task-btn.checkbox.wh-28px.brr-max.bx-sz-bb.fshrink-0.mt-5px", {onclick: function(){
                            let btn = document.getElementById("add-task");
                            let taskmodal = document.getElementById("taskmodal");
                            btn.classList.add("dnone");
                            taskmodal.classList.remove("dnone");
                        }},[
                            m("img[src='./public/img/add_icon.svg']")
                        ]),
                        m("task-title.ft-10px.fc-FF0000", {innerHTML: "Ajouter une tâche"})
                    ])
                ]),
                m("div#taskmodal.dnone.t-alg-r", [
                    // TODO(): There is a bug with word wrapping. Low priority task i don't care.
                    //         To reproduce the bug just add a long word like just repeating the same char.
                    m("div.bogosse.bg-fffbf0", [
                        m("textarea#task-area.fc-cd9300.w-100p.dblock.mb-14px[rows=8].br-1px.br-solid.brr-5px.br-color-ffeec3.h-140px.bg-fffbf0.mt-28px.pl-39px.bx-sz-bb.pt-16px.ft-16px.ff-roboto"),
                    ]),
                    m("button.brr-5px.bg-ffdede.pl-8px.pr-41px.pb-10px.pt-16px.fc-ff57.mr-10px br-1px br-solid br-color-ffba", {innerHTML:"Annuler", onclick:function(){
                        let taskmodal = document.getElementById("taskmodal");
                        taskmodal.classList.add("dnone");
                        let addtaskbtn = document.getElementById("add-task");
                        addtaskbtn.classList.remove("dnone");
                    }}),
                    m("button.brr-5px.bg-f0fff2.pl-8px.pr-41px.pb-10px.pt-16px.br-color-d3ffda.br-solid.br-1px.fc-00ac1b", {innerHTML:"Ajouter", onclick: function () {
                        let task_area = document.getElementById("task-area");
                        add_task(task_area.value);
                    }})
                ])
            ])
        ];
    }
};

m.mount(document.body, app);