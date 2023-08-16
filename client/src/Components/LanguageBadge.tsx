import {Box} from "@chakra-ui/react";

interface LanguageItemProps {
    language: string
}

const LanguageBadgeItem = ({language } : LanguageItemProps) => {
    return (
        <div style={{'whiteSpace': 'nowrap'}}>
            <Box
                px={2}
                py={1}
                borderRadius="lg"
                margin={1}
                mr={10}
                // variant="solid"
                fontSize={12}
                backgroundColor="#284b63"
                color ='white'
            >
                {language}
            </Box>
        </div>
    )
}

export default LanguageBadgeItem;