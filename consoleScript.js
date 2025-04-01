(function countTotalElements() {
    const elements = document.querySelectorAll('*');
    const totalElements = elements.length;

    // Count occurrences of each tag
    const tagCounts = {};
    elements.forEach(el => {
        const tag = el.tagName.toLowerCase();
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });

    // Output total elements count
    console.log(`Total Elements on Page: ${totalElements}`);

    // Output a table of element counts
    console.table(tagCounts);
})();
