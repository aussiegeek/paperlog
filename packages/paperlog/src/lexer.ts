import Tokenizr from "tokenizr";
import { Command } from "./parse";

export let lexer = new Tokenizr();
lexer.rule(/mycall ([a-zA-Z0-9_]*)/, (ctx, match) => {
  ctx.accept(Command.MyCall, match[1]);
});
lexer.rule(/date (\d{8})/, (ctx, match) => {
  ctx.accept(Command.Date, match[1]);
});
lexer.rule(/(\d{1,2}\.\d+)/, (ctx, match) => {
  ctx.accept(Command.Freq, match[1]);
});
lexer.rule(/mode (cw|ssb)/, (ctx, match) => {
  ctx.accept(Command.Mode, match[1]?.toUpperCase());
});
lexer.rule(/cw/, (ctx) => {
  ctx.accept(Command.Mode, "CW");
});
lexer.rule(/([0-2][0-9][0-5][0-9])/, (ctx, match) => {
  ctx.accept(Command.TimeOn, match[1]);
});
lexer.rule(/call ([0-9a-z\/]+)/, (ctx, match) => {
  ctx.accept(Command.Call, match[1]);
});
lexer.rule(/s(\d+)/, (ctx, match) => {
  ctx.accept(Command.RstSent, match[1]);
});
lexer.rule(/r(\d+)/, (ctx, match) => {
  ctx.accept(Command.RstRcvd, match[1]);
});
lexer.rule(/sota ([a-zA-Z0-9\/\-]+)/, (ctx, match) => {
  ctx.accept(Command.Sota, match[1]?.toUpperCase());
});
lexer.rule(/mysota ([a-z0-9\/-]+)/, (ctx, match) => {
  ctx.accept(Command.MySota, match[1]?.toUpperCase());
});
lexer.rule(/wwff ([a-zA-Z0-9\-]+)/, (ctx, match) => {
  ctx.accept(Command.Wwff, match[1]?.toUpperCase());
});
lexer.rule(/mywwff ([a-zA-Z0-9-]+)/, (ctx, match) => {
  ctx.accept(Command.MyWwff, match[1]?.toUpperCase());
});
lexer.rule(/pota ([a-zA-Z0-9\-]+)/, (ctx, match) => {
  ctx.accept(Command.Pota, match[1]?.toUpperCase());
});
lexer.rule(/mypota ([a-zA-Z0-9-]+)/, (ctx, match) => {
  ctx.accept(Command.MyPota, match[1]?.toUpperCase());
});
lexer.rule(/ /, (ctx) => ctx.ignore());
