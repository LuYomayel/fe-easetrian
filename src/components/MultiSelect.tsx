import React, {useState} from 'react';
import {View} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';

interface MultiSelectProps {
  options: Array<{name: string; id: string}>; // Define el tipo de tus opciones
  onSelectedValuesChange: (
    selectedValues: Array<{name: string; id: string}>,
  ) => void; // Función callback para cuando cambian los valores seleccionados
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onSelectedValuesChange,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  // Función para manejar cambios en la selección
  const handleMultiSelectChange = name => {
    const newSelectedValues = xorBy(selectedValues, [name], 'id');
    setSelectedValues(newSelectedValues);
    onSelectedValuesChange(newSelectedValues); // Llama al callback con los nuevos valores seleccionados
  };

  return (
    <View style={{}}>
      <SelectBox
        label="Body Area/s"
        inputPlaceholder="Select multiple body areas"
        options={options}
        selectedValues={selectedValues}
        onMultiSelect={handleMultiSelectChange}
        onTapClose={handleMultiSelectChange}
        isMulti
      />
    </View>
  );
};

export default MultiSelect;
