import {
  Box,
  Button,
  ButtonGroup,
  Code,
  Heading,
  Icon,
  IconButton,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import {
  BsTypeBold,
  BsTypeItalic,
  BsCode,
  BsTypeH1,
  BsTypeH2,
  BsType,
  BsChatSquareQuote,
  BsListOl,
  BsListUl,
} from "react-icons/bs";
import React, { useCallback, useMemo, useState } from "react";
import {
  Transforms,
  createEditor,
  BaseEditor,
  Descendant,
  Editor,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact, ReactEditor, useSlate } from "slate-react";
import isHotkey from "is-hotkey";

type ParagraphElement = { type: "paragraph"; children: CustomText[] };
type BlockQuoteElement = { type: "block-quote"; children: CustomText[] };
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | BlockQuoteElement;
    Text: CustomText;
  }
}

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+`": "code",
};

interface Props {
  readOnly: boolean;
  setFormValue: (value: any) => void;
  initialValue: Descendant[];
}

const RichTextEditor: React.FC<Props> = ({
  setFormValue,
  readOnly,
  initialValue,
}) => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [active, setActive] = useState(false);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);

  return (
    <>
      <Box>
        <Slate
          editor={editor}
          value={value}
          onChange={(x) => {
            setValue(x);
            setFormValue(x);
          }}
        >
          <Toolbar hidden={!active}>
            <MarkButton format="bold" icon={<Icon as={BsTypeBold} />} />
            <MarkButton format="italic" icon={<Icon as={BsTypeItalic} />} />
            <MarkButton format="code" icon={<Icon as={BsCode} />} />
            <BlockButton format="paragraph" icon={<Icon as={BsType} />} />
            <BlockButton format="heading-one" icon={<Icon as={BsTypeH1} />} />
            <BlockButton format="heading-two" icon={<Icon as={BsTypeH2} />} />
            <BlockButton
              format="block-quote"
              icon={<Icon as={BsChatSquareQuote} />}
            />
            <BlockButton format="numbered-list" icon={<Icon as={BsListOl} />} />
            <BlockButton format="bulleted-list" icon={<Icon as={BsListUl} />} />
          </Toolbar>
          <Box
            borderRadius="md"
            border={readOnly ? "none" : "1px solid"}
            borderColor={active ? "#3182ce" : "gray.200"}
            boxShadow={active ? "0 0 0 1px #3182ce" : ""}
            overflow="hidden"
            mt={2}
            padding={2}
            transition="0.2s ease"
            _hover={
              !active && !readOnly
                ? {
                    // bgColor: "gray.100",
                    borderColor: "gray.300",
                    cursor: "pointer",
                    transition: "0.2s ease",
                  }
                : {}
            }
            onClick={() => {
              if (!readOnly) setActive(true);
            }}
          >
            <Editable
              readOnly={!active || readOnly}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              // onBlur={() => setActive(false)}
              spellCheck
              autoFocus={true}
              placeholder={readOnly ? "" : ""}
              onKeyDown={(event) => {
                for (const hotkey in HOTKEYS) {
                  if (isHotkey(hotkey, event as any)) {
                    event.preventDefault();
                    const mark = HOTKEYS[hotkey];
                    toggleMark(editor, mark);
                  }
                }
              }}
            />
          </Box>
        </Slate>
        <ButtonGroup hidden={!active} mt={4} spacing={2}>
          <Button
            onClick={() => {
              setValue(initialValue);
              setFormValue(initialValue);
              setActive(false);
            }}
            size="sm"
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            colorScheme="orange"
            onClick={() => {
              setFormValue(value);
              setActive(false);
            }}
          >
            Save
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};
const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      LIST_TYPES.includes(
        //@ts-ignore
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const Toolbar = ({ children, ...props }) => {
  return <ButtonGroup {...props}>{children}</ButtonGroup>;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return (
        <Heading fontSize="lg" color="gray.500" {...attributes}>
          {children}
        </Heading>
      );
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return <Heading {...attributes}>{children}</Heading>;
    case "heading-two":
      return <Heading {...attributes}>{children}</Heading>;
    case "list-item":
      return <ListItem {...attributes}>{children}</ListItem>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    default:
      return <Box {...attributes}>{children}</Box>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = (
      <Box display="inline-block" fontWeight="bold">
        {children}
      </Box>
    );
  }

  if (leaf.code) {
    children = <Code>{children}</Code>;
  }

  if (leaf.italic) {
    children = (
      <Box display="inline-block" fontStyle="italic">
        {children}
      </Box>
    );
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="ghost"
      isActive={isBlockActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      aria-label={format}
      icon={icon}
    />
  );
};
const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <IconButton
      variant="ghost"
      isActive={isMarkActive(editor, format)}
      onMouseDown={(event) => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      aria-label={format}
      icon={icon}
    />
  );
};

export default RichTextEditor;
