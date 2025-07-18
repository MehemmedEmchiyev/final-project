import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Forms({ data, value, change, lable , isFormik }) {
    return (
        <FormControl
            sx={{
                m: 1,
                backgroundColor: '#1e1e1e',
                borderRadius: '8px',
                color: 'white'
            }}
            className='w-full'
            size="small"
        >
            <Select
                value={value}
                onChange={e => {isFormik ? change(e) : change(e.target.value)}}
                labelId={lable}
                name={isFormik ? "country" : ""}
                sx={{
                    color: 'white',
                    '.MuiOutlinedInput-notchedOutline': {
                        borderColor: '#444',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#666',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#888',
                    },
                    backgroundColor: '#1e1e1e',
                }}
            >
                {
                    data?.map((item, index) => <MenuItem value={item?.name ?? item} className='text-white' key={index}>{item?.name ? item?.name : item}</MenuItem>)
                }
            </Select>
        </FormControl>
    )
}

export default Forms