function openTab(tabBlockId, tabTrigger) {
    var block = document.getElementById(tabBlockId);
    tabsName = block.getAttribute("data-tabs");
    document.querySelectorAll(".js-tab__trigger[data-tabs=" + tabsName + "]").forEach(function(trigger) {
        trigger.classList.remove("tab__trigger--active");
    });
    document.querySelectorAll(".js-tab__block[data-tabs=" + tabsName + "]").forEach(function (tab) {
        tab.classList.remove("tab__block--active");
    });
    tabTrigger.classList.add("tab__trigger--active");
    block.classList.add("tab__block--active");
}