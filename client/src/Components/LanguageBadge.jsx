import {Box} from "@chakra-ui/react";

const LanguageBadgeItem = ({language }) => {
    return (
        <>
            <Box
                px={2}
                py={1}
                borderRadius="lg"
                margin={1}
                marginBottom={2}
                variant="solid"
                fontSize={12}
                backgroundColor="#284b63"
                color ='white'
            >
                {language}
            </Box>
        </>
    )
}

export default LanguageBadgeItem;