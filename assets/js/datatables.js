$(document).ready(function () {

    $("#userstable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [0, 7] }]
    });

    $("#roletable").dataTable({
        order: [],
        columnDefs: [{ orderable: false, targets: [2] }]
    })
});