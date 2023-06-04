for old in *; do
    new="$(echo "$old" | sed -e 's/svg$/new.svg/')"
    rsvg-convert "$old" -w 1440 -h 525 -f svg -o "$new"
done
