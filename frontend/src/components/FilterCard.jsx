import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-50k", "50k-2L", "2L to 10L","10L + "]
    },

]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
  <div className="w-full bg-gradient-to-br from-white via-slate-50 to-blue-50/60 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl p-6">
    <h1 className="text-2xl font-extrabold text-indigo-700 flex items-center gap-2">
      <svg
        className="w-6 h-6 text-indigo-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM10 16a6 6 0 100-12 6 6 0 000 12z" />
      </svg>
      Filter Jobs
    </h1>
    <hr className="my-4 border-slate-300" />

    <RadioGroup
      value={selectedValue}
      onValueChange={changeHandler}
      className="space-y-8"
    >
      {fitlerData.map((data, index) => (
        <div key={data.fitlerType || index} className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-1">
            {data.fitlerType}
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="relative">
                  <RadioGroupItem
                    value={item}
                    id={itemId}
                    className="peer hidden"
                  />
                  <Label
                    htmlFor={itemId}
                    className="flex items-center gap-3 w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-700 shadow-md transition-all duration-200 hover:bg-indigo-50 hover:border-indigo-300 peer-checked:border-indigo-500 peer-checked:bg-indigo-100 peer-checked:text-indigo-700 peer-checked:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5 text-indigo-400 peer-checked:text-indigo-600 transition-colors"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 13.707a1 1 0 01-1.414 0L5.586 12l1.414-1.414L8 11.586l4.293-4.293 1.414 1.414L8.707 13.707z" />
                    </svg>
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </RadioGroup>
  </div>
);


}

export default FilterCard