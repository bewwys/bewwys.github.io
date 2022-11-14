let current_date = new Date();
let day = current_date.getDay();
let month = current_date.getMonth();

let tasks = [
    
];

function do_task(task) {
    return m("div.task",[
        m("div.dflex fgap-12px", [
            m(`div#check-for-${task.id}.checkbox.wh-28px.brr-max.br-solid.br-2px.br-color-75.bg-fffbf0.bx-sz-bb.fshrink-0.mt-5px`, {
                onclick: function(e) {
                    let check = e.target;
                    console.log(e.target);
                    console.log("exit -> " + task.id);
                    // INVESTIGATE(): Why we need to add and remove the class exit ?
                    //                When we rerender this thing I was expecting that the position
                    //                of the task in the list doesn't matter but somehow
                    //                if we clicked and remove a task at let say index 0 then
                    //                the task at index 1 which is now at index 0 keep the class exit
                    //                of the previous deleted task at index 0.
                    check.classList.add("exit");
                    // check.addEventListener("animationend", function() {
                    //     
                    // });
                },
                onanimationend: function (e) {
                    // TODO(): Because the animation take a certain amount of time we are in a situation where
                    //         the ids are wrongs.
                    console.log("the task removed is: " + task.id);
                    let check = e.target;
                    check.classList.remove("exit");
                    let index = tasks.findIndex((taskouille) => taskouille.id === task.id);
                    tasks.splice(index, 1);
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
    tasks.push({id: tasks.length, title: title, done:0});
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
                tasks.length > 0 ? m("div.tasks", [
                    tasks.map(function(task) {
                        return do_task(task);
                    })
                ]): m("p.mb-8px.pl-39px", {innerHTML:"Aucune tâche"}, m("div.h-1px.bg-e9 my-8px")),
                m("div#add-task.add-task", [
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
                    m("textarea#task-area.fc-cd9300.w-100p.dblock.mb-14px[rows=8].br-1px.br-solid.brr-5px.br-color-ffeec3.h-140px.bg-fffbf0.mt-28px.pl-39px.bx-sz-bb.pt-16px.ft-16px.ff-roboto"),
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