import { useGetBooksByTitleQuery, Book } from "@/models/generated/graphql";
import { Fade, Menu as MuiMenu, MenuItem, Button, Skeleton } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Routes from "../../../shared/enums/routes";

interface HeadMenuItemProps {
    title: string,
}

export const HeadMenuItem = (props : HeadMenuItemProps) : JSX.Element => {
    const { data, loading, error } = useGetBooksByTitleQuery({ variables: { title: `%${props.title}%` }})
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuAnchorRef = useRef<HTMLButtonElement>(null)

    if (loading) {
        return (
            <Skeleton variant="text" sx={{ fontSize: '20px', width: 200, backgroundColor: 'white' }} />
         )
    }
    if (error) return <p>An error occurred: {error.message}</p>;

    const onMenuItemClicked = (id : string) => {
        navigate(Routes.ChapterOverview.replace(':bookId', id))
    }
    
    const handleOnCloseMenu = () => {
        setIsMenuOpen(false)
    }

    const handleOnMenuOpen = () => {
        setIsMenuOpen(true)
    }

    return (
        <div>
            <Button ref={menuAnchorRef} onClick={handleOnMenuOpen}>{props.title}</Button>
            <MuiMenu
                id="fade-menu"
                MenuListProps={{
                'aria-labelledby': 'fade-button',
                }}
                anchorEl={menuAnchorRef.current}
                open={isMenuOpen}
                onClose={handleOnCloseMenu}
                TransitionComponent={Fade}
            >
                { data?.book.map((x: Book) => (
                    <MenuItem key={x.title} onClick={() => { handleOnCloseMenu(); onMenuItemClicked(x.id); }}>{x.title}</MenuItem>
                ))}
            </MuiMenu>            
        </div>
    )
}