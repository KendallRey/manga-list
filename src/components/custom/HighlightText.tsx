import React, { useMemo } from "react";

type HighlightTextProps = {
  text: string;
  subString?: string | null;
};

type TextType = {
  type: "normal" | "bold";
  value: string;
};

const HighlightText: React.FC<HighlightTextProps> = ({ text, subString }) => {
  const textStrings = useMemo((): TextType[] => {
    if (!subString || !text) return [{ type: "normal", value: text }];
    const strings: TextType[] = [];
    const _text = text.toLowerCase();
    const _subString = subString.toLowerCase();
    const hasTheValue = _text.indexOf(_subString);
    if (hasTheValue === -1) return [{ type: "normal", value: text }];

    const subStrings = _text.split(_subString);
    const isHighlightFirst = hasTheValue === 0;
    if (isHighlightFirst) subStrings.shift();

    let lastRealSubIndex = 0;
    let lastRealIndex = 0;
    const subStringOffset = Math.max(subString.length, 1);

    subStrings.forEach((sub) => {
      const realSubIndex = _text.indexOf(sub, lastRealSubIndex);
      lastRealSubIndex = realSubIndex;
      const realSub = text.substring(realSubIndex, realSubIndex + sub.length);

      const realIndex = _text.indexOf(_subString, lastRealIndex);
      lastRealIndex = realIndex + subStringOffset;
      const real = text.substring(realIndex, realIndex + subString.length);

      if (isHighlightFirst) {
        strings.push({ type: "bold", value: real });
        if (sub !== "") strings.push({ type: "normal", value: realSub });
      } else {
        strings.push({ type: "normal", value: realSub });
        strings.push({ type: "bold", value: real });
      }
    });

    const formattedText = strings.map((str) => str.value).join("");
    if (formattedText.length > text.length) strings.pop();

    return strings;
  }, [text, subString]);

  return (
    <span>
      {textStrings.map((item, i) =>
        item.type === "bold" ? (
          <strong
            key={`${item.value}-${i}`}
            className="font-semibold text-pink-500 dark:text-pink-400"
          >
            {item.value}
          </strong>
        ) : (
          <span key={`${item.value}-${i}`} className="text-gray-800 dark:text-gray-200">
            {item.value}
          </span>
        )
      )}
    </span>
  );
};

export default HighlightText;
