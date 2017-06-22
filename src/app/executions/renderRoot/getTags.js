function getTags({ firebase }) {
  return firebase
    .value('tags', {
      orderByChild: 'lastDatetime',
      limitToFirst: 20,
    })
    .then(response => {
      const tags = Object.keys(response.value || [])
        .sort((tagKeyA, tagKeyB) => {
          if (
            response.value[tagKeyA].lastDatetime >
            response.value[tagKeyB].lastDatetime
          ) {
            return -1;
          } else if (
            response.value[tagKeyA].lastDatetime <
            response.value[tagKeyB].lastDatetime
          ) {
            return 1;
          }

          return 0;
        })
        .reduce((allTags, tag, index, sortedTags) => {
          const lastTagKey = sortedTags[sortedTags.length - 1];
          const count = Math.round(
            (response.value[tag].lastDatetime -
              response.value[lastTagKey].lastDatetime) /
              86400000
          );

          return allTags.concat({
            value: tag,
            count: count + response.value[tag].readCount,
          });
        }, [])
        .sort((tagA, tagB) => {
          if (tagA.count > tagB.count) {
            return -1;
          } else if (tagA.count < tagB.count) {
            return 1;
          }

          return 0;
        });

      return { tags };
    });
}

export default getTags;
