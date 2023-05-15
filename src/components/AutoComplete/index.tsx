import React, { useState } from 'react';
import { Autocomplete, Stack, TextField } from '@mui/material';

const AutocompleteInput = () => {
    const [results, setResults] = useState([]);

    const searchPlaces = (query: string) => {
        fetch(
            'https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=v3XFar3gKIuWv7fn4sNSVWtQy9MD9-yq5rCh5f0tpfA&prox=Latitude,Longitude&query=' +
                query,
            {
                method: 'GET',
            },
        )
            .then((response) => response.json())
            .then((result: any) => setResults(result.suggestions))
            .catch((error) => console.log('error', error));
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Autocomplete
                fullWidth
                freeSolo
                options={results}
                filterSelectedOptions={true}
                getOptionLabel={(option: any) => {
                    return option && option.label;
                }}
                filterOptions={(x) => x}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Digite o endereço"
                        variant="outlined"
                        onChange={(event) => {
                            searchPlaces(event.target.value);
                        }}
                    />
                )}
            />
        </Stack>
    );
};
