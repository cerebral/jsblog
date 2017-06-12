/** @jsx h */
import { h } from 'preact';

const fontSizeConverter = (count, min, max, minSize, maxSize) => {
  return Math.round(
    (count - min) * (maxSize - minSize) / (max - min) + minSize
  );
};

function Tags({ tags }) {
  const counts = tags.map(tag => tag.count),
    min = Math.min(...counts),
    max = Math.max(...counts);
  const data = tags.map(tag => ({
    tag,
    fontSize: fontSizeConverter(tag.count, min, max, 12, 35),
  }));

  return (
    <div className="Tags-wrapper">
      {data.map(tagData =>
        <a
          href={`/tags/${tagData.tag.value}`}
          key={tagData.tag.value}
          className="Tags-tag"
          style={{ fontSize: `${tagData.fontSize}px` }}
        >
          {tagData.tag.value}
        </a>
      )}
    </div>
  );
}

export default Tags;
