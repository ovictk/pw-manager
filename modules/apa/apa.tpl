<div class="overlay out"></div>
<div class="overlayContent out">
	<div id="addAccount">
		<div class="olCtHeader">
			<span>Add Account</span>
			<button class="exit">
				<svg viewBox="0 0 320 512"><path d="M317.7 402.3c3.125 3.125 3.125 8.188 0 11.31c-3.127 3.127-8.186 3.127-11.31 0L160 267.3l-146.3 146.3c-3.127 3.127-8.186 3.127-11.31 0c-3.125-3.125-3.125-8.188 0-11.31L148.7 256L2.344 109.7c-3.125-3.125-3.125-8.188 0-11.31s8.188-3.125 11.31 0L160 244.7l146.3-146.3c3.125-3.125 8.188-3.125 11.31 0s3.125 8.188 0 11.31L171.3 256L317.7 402.3z"/></svg>
			</button>
		</div>
		<div class="olCtBody">
			<form method="post" id="insAcc" autocomplete="off">
				<table id="iFAA">
					<tr><td class="dataType">Name:</td><td class="dataValue"><input class="accDataI" type="text" placeholder="Name name" name="name" id="nameI"></td><td class="genButtons"><button type="button" id="nameGen">GEN</button></td></tr>
					<tr><td class="dataType">EMail: </td><td class="dataValue"><input class="accDataI" type="text" placeholder="example@example.com" name="email" id="emailI"></td></tr>
					<tr><td class="dataType">Password:</td><td class="dataValue"><input class="accDataI" type="text" placeholder="123567890!" name="password" id="passwordI"></td><td class="genButtons" id="pwGen"><button type="button">GEN</button></td></tr>
					<tr><td class="dataType">Group:</td><td class="dataValue"><input class="accDataI" type="text" placeholder="example group" name="group" id=""></td></tr>
					<tr><td class="dataType">Mobile:</td><td class="dataValue"><input class="accDataI" type="text" placeholder="+49 123 456789" name="phone" id=""></td></tr>
					<tr><td class="dataType">C_date:</td><td class="dataValue"><input class="accDataI" type="date" placeholder="DD.MM.YYYY" name="c_date" id="dateI"></td><td class="genButtons"><button type="button" id="dateGen">GEN</button></td></tr>
					<tr><td class="dataType">Notes:</td><td class="dataValue"><textarea class="accDataI" name="notes" id=""></textarea></td></tr>
				</table>
			</form>
		</div>
		<div class="olCtFooter">
			<input type="text" id="nFname">
			<select id="nFtype">
				<option value="text">text</option>
				<option value="date">date</option>
				<option value="textarea">textarea</option>
				<option value="email">email</option>
				<option value="tfasteam">TFA Steam</option>
				<option value="tfagoogle">TFA Google</option>
			</select>
			<button type="button" id="addnF">+</button>
			<input type="submit" value="OK" class="def send">
		</div>
	</div>
	<div id="attr_mng" class="off">
		<div class="olCtHeader">
			<span>Manage attributes</span>
			<button class="exit">
				<svg viewBox="0 0 320 512"><path d="M317.7 402.3c3.125 3.125 3.125 8.188 0 11.31c-3.127 3.127-8.186 3.127-11.31 0L160 267.3l-146.3 146.3c-3.127 3.127-8.186 3.127-11.31 0c-3.125-3.125-3.125-8.188 0-11.31L148.7 256L2.344 109.7c-3.125-3.125-3.125-8.188 0-11.31s8.188-3.125 11.31 0L160 244.7l146.3-146.3c3.125-3.125 8.188-3.125 11.31 0s3.125 8.188 0 11.31L171.3 256L317.7 402.3z"/></svg>
			</button>
		</div>
		<div class="olCtBody">
			<table>
				<tr>
					<td id="left">
						<div class="attrList">
							not loaded...
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="olCtFooter">
			<input type="text" id="newAttrName"><button class="addAttrNew def">add</button> 
		</div>
	</div>
</div>
<?= $links ?>
<div class="apaContent">
	<?= $content ?>
</div>