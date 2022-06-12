# sr-archive-lb

Clone repo recursively:
```bash
git clone https://github.com/retro-git/sr-archive-lb --recursive
```

Install npm dependencies:
```bash
cd sr-archive-lb
npm i
```

Install src-dump submodule dependencies:
```bash
cd src-dump
python3 -m pip install -r requirements.txt
```

Dump speedrun.com leaderboards, listed in leaderboards.txt, to SQLite database:
```bash
npm run dump
```

Store additional runs in `src/data/extras.sqlite` database.

Optionally, override arbitrary data of a given run, identified by its hash, in `src/data/overrides.json`.

Run test server:
```bash
npm run start
```

Build distribution folder:
```bash
npm run build
```