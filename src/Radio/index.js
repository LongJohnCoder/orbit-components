// @flow
import * as React from "react";
import styled from "styled-components";

import defaultTokens from "../defaultTokens";
import { StyledText } from "../Text";
import type { Ref } from "../common/common.js.flow";
import { rtlSpacing } from "../utils/rtl";

import type { Props } from "./index";

const getBorderColor = () => ({ theme, hasError, disabled, checked }) =>
  hasError && !disabled && !checked
    ? theme.orbit.borderColorCheckboxRadioError
    : theme.orbit.borderColorCheckboxRadio;

const Glyph = styled.span`
  visibility: hidden;
  width: 12px;
  height: 12px;
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.orbit.colorIconCheckboxRadioDisabled : theme.orbit.colorIconCheckboxRadio};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusCircle};
  flex-shrink: 0;
`;

Glyph.defaultProps = {
  theme: defaultTokens,
};

const IconContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.orbit.backgroundInput};
  height: ${({ theme }) => theme.orbit.heightCheckbox};
  width: ${({ theme }) => theme.orbit.widthCheckbox};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusCircle};
  transform: scale(1);
  transition: all ${({ theme }) => theme.orbit.durationFast} ease-in-out;
  }
`;

IconContainer.defaultProps = {
  theme: defaultTokens,
};

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${({ theme }) => rtlSpacing(`0 0 0 ${theme.orbit.spaceXSmall}`)};
  flex: 1; // IE wrapping fix
`;

TextContainer.defaultProps = {
  theme: defaultTokens,
};

const Info = styled.span`
  font-size: ${({ theme }) => theme.orbit.fontSizeFormFeedback};
  color: ${({ theme }) => theme.orbit.colorInfoCheckBoxRadio};
  line-height: ${({ theme }) => theme.orbit.lineHeightText};
`;

Info.defaultProps = {
  theme: defaultTokens,
};

const LabelText = styled.span`
  font-weight: ${({ theme }) => theme.orbit.fontWeightNormal};
  font-size: ${({ theme }) => theme.orbit.fontSizeFormLabel};
  color: ${({ theme }) => theme.orbit.colorFormLabel};
  line-height: ${({ theme }) => theme.orbit.heightCheckbox};

  ${StyledText} {
    font-weight: ${({ theme }) => theme.orbit.fontWeightNormal};
    font-size: ${({ theme }) => theme.orbit.fontSizeFormLabel};
    color: ${({ theme }) => theme.orbit.colorFormLabel};
    line-height: ${({ theme }) => theme.orbit.heightCheckbox};
  }
`;

LabelText.defaultProps = {
  theme: defaultTokens,
};

const Input = styled.input`
  visibility: hidden;
  display: none;

  &:checked ~ ${TextContainer} > ${LabelText} {
    font-weight: ${({ theme }) => theme.orbit.fontWeightMedium};
    & > ${StyledText} {
      font-weight: ${({ theme }) => theme.orbit.fontWeightMedium};
    }
  }

  &:checked + ${IconContainer} > ${Glyph} {
    visibility: visible;
  }
`;

Input.defaultProps = {
  theme: defaultTokens,
};

const Label = styled(({ disabled, theme, type, hasError, ...props }) => (
  <label {...props}>{props.children}</label>
))`
  font-family: ${({ theme }) => theme.orbit.fontFamily};
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: self-start;
  opacity: ${({ disabled, theme }) => (disabled ? theme.orbit.opacityCheckboxDisabled : "1")};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  position: relative;

  ${IconContainer} {
    border: 1px solid ${getBorderColor()};
  }

  &:hover ${IconContainer} {
    border-color: ${({ disabled, theme }) =>
      !disabled && theme.orbit.borderColorCheckboxRadioHover};
  }

  &:active ${IconContainer} {
    border-color: ${({ disabled, theme }) =>
      disabled ? getBorderColor() : theme.orbit.borderColorCheckboxRadioActive};
    transform: ${({ disabled, theme }) =>
      !disabled && `scale(${theme.orbit.modifierScaleCheckboxRadioActive})`};
  }
  &:focus {
    outline: 0;
    & ${IconContainer} {
      border: ${({ theme }) =>
        `2px ${theme.orbit.borderStyleInput} ${theme.orbit.borderColorCheckboxRadioFocus}`};
    }
  }
`;

Label.defaultProps = {
  theme: defaultTokens,
};

// $FlowExpected
const Radio = React.forwardRef((props: Props, ref: Ref) => {
  const {
    label,
    value,
    hasError = false,
    disabled = false,
    checked = false,
    onChange,
    name,
    info,
    readOnly,
    tabIndex,
    dataTest,
  } = props;
  return (
    <Label disabled={disabled} hasError={hasError} checked={checked}>
      <Input
        data-test={dataTest}
        value={value}
        type="radio"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        name={name}
        tabIndex={tabIndex}
        ref={ref}
        readOnly={readOnly}
      />
      <IconContainer>
        <Glyph disabled={disabled} />
      </IconContainer>
      {(label || info) && (
        <TextContainer>
          {label && <LabelText>{label}</LabelText>}
          {info && <Info>{info}</Info>}
        </TextContainer>
      )}
    </Label>
  );
});

Radio.displayName = "Radio";

export default Radio;
